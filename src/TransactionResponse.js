import AccountId from "./account/AccountId";
import TransactionId from "./TransactionId";
import TransactionReceipt from "./TransactionReceipt";
import TransactionRecord from "./TransactionRecord";
import TransactionReceiptQuery from "./TransactionReceiptQuery";
import TransactionRecordQuery from "./TransactionRecordQuery";

export default class TransactionResponse {
    /**
     * @internal
     * @param {object} props
     * @param {AccountId} props.nodeId
     * @param {Uint8Array} props.transactionHash
     * @param {TransactionId} props.transactionId
     */
    constructor(props) {
        /** @readonly */
        this.nodeId = props.nodeId;

        /** @readonly */
        this.transactionHash = props.transactionHash;

        /** @readonly */
        this.transactionId = props.transactionId;

        Object.freeze(this);
    }

    /**
     * @template ChannelT
     * @param {import("./client/Client").default<ChannelT>} client
     * @returns {Promise<TransactionReceipt>}
     */
    getReceipt(client) {
        return new TransactionReceiptQuery()
            .setTransactionId(this.transactionId)
            .setNodeId(this.nodeId)
            .execute(client);
    }

    /**
     * @template ChannelT
     * @param {import("./client/Client").default<ChannelT>} client
     * @returns {Promise<TransactionRecord>}
     */
    getRecord(client) {
        return new TransactionRecordQuery()
            .setTransactionId(this.transactionId)
            .setNodeId(this.nodeId)
            .execute(client);
    }
}
