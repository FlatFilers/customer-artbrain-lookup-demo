import { deleteSpace, TestListener, getEnvironmentId } from "@flatfile/utils-testing";
import { Flatfile, FlatfileClient } from "@flatfile/api";
import { PubSubDriver } from "@flatfile/listener-driver-pubsub";

import app from "../..";

const api = new FlatfileClient();
let spaceId: string;
const activeDrivers: PubSubDriver[] = [];

/**
 * createListener
 *
 * Creates a new listener, optionally filtered to listen only for events in a specific space.
 *
 * @param {string?} spaceId - The ID of the space to filter the listener to
 * @returns {Promise<TestListener>} A listener (optionally filtered to a space)
 */
async function createListener(spaceId?: string): Promise<TestListener> {
  const filters = spaceId ? { spaceId } : {};
  const filteredListener = new TestListener().filter(filters);
  const driver = new PubSubDriver(getEnvironmentId());

  // Start the driver and mount it to the listener
  await driver.start();
  filteredListener.mount(driver);
  activeDrivers.push(driver);

  return filteredListener;
}

/**
 * createBlankSpace
 *
 * Creates a blank space for the test suite to use.
 *
 * @returns {Promise<Flatfile.Space>} The blank space that was created
 */
async function createBlankSpace(): Promise<Flatfile.Space> {
  const environmentId = getEnvironmentId();
  const testName = expect.getState().testPath?.split("/").pop() || "Unknown Test";
  const { data: blankSpace } = await api.spaces.create({
    name: `ci-space-${Date.now()} - ${testName}`,
    environmentId,
    autoConfigure: false,
  });

  return blankSpace;
}

/**
 * noop
 *
 * A no-operation function that does nothing.
 */
function noop(...args: any): void {}

/**
 * configureSpace
 *
 * When this file is required, it adds beforeAll and afterAll hooks to create and delete a space
 * for the test suite. It attaches the application to the listener and waits for the new space to
 * be configured before attaching the space and listener to the global object.
 */
(function configureSpace() {
  beforeAll(async () => {
    const blankSpace = await createBlankSpace();
    const listener = await createListener(blankSpace.id);

    spaceId = blankSpace.id;
    app(listener);
    listener.on("**", noop);

    await api.jobs.create({
      type: "space",
      operation: "configure",
      source: blankSpace.id,
      trigger: "immediate",
      status: "executing",
      environmentId: getEnvironmentId(),
    });
    await listener.waitFor("job:completed", 1, { job: "space:configure" });
    listener.detach();
  });

  afterAll(async () => {
    await deleteSpace(spaceId);
    activeDrivers.forEach((driver) => driver.shutdown());
  });
})();

/**
 * getListener
 *
 * Returns a listener with the application attached that is filtered to the
 * current space.
 *
 * @returns {Promise<TestListener>} A space-filtered listener with the application attached
 */
export async function getListener(): Promise<TestListener> {
  const listener = await createListener(spaceId);

  app(listener);
  listener.on("**", noop);

  return listener;
}

/**
 * getTestSpace
 *
 * Returns the space that was created for the test suite.
 *
 * @returns {Promise<Flatfile.Space>} The space that was created for the test suite
 */
export async function getTestSpace(): Promise<Flatfile.Space> {
  const { data: space } = await api.spaces.get(spaceId);
  return space;
}

/**
 * getTestSpaceId
 *
 * Returns the ID of the space that was created for the test suite.
 *
 * @returns {string} The ID of the space that was created for the test suite
 */
export function getTestSpaceId(): string {
  return spaceId;
}
