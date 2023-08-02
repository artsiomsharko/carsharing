/**
 * @swagger
 * components:
 *   schemas:
 *     MongoUpdateResult:
 *       type: object
 *       properties:
 *         acknowledged:
 *           type: boolean
 *           description: Indicates whether the update operation was acknowledged.
 *         modifiedCount:
 *           type: number
 *           description: The number of documents that were modified by the update operation.
 *         upsertedId:
 *           type: null
 *           description: The upserted ID. (Since it's null in this case, it implies no document was upserted)
 *         upsertedCount:
 *           type: number
 *           description: The number of documents upserted during the update operation.
 *         matchedCount:
 *           type: number
 *           description: The number of documents that matched the update criteria.
 *       example:
 *         acknowledged: true
 *         modifiedCount: 1
 *         upsertedId: null
 *         upsertedCount: 0
 *         matchedCount: 1
 */
