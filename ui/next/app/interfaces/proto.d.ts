/* tslint:disable:jsdoc-format */

/**
* The Proto package contains data interfaces which correspond to
* protobuffer messages on the server; any message returned directly from
* the server should be contained in this package.
*
* The interfaces in this package are currently maintained manually, but it
* should be possible in the future to automatically generate these
* structures.
*/

/*****************************
 * roachpb/metadata.proto
 ****************************/

/**
 * Address is used to represent a network address.
 *
 * Source message = "Addr".
 */
export interface Addr {
  network: string;
  address: string;
}

/**
 * StoreCapacity details the used and available capacity of a store.
 */
export interface StoreCapacity {
  capacity: number;
  available: number;
  range_count: number;
}

/**
 * NodeDescriptor contains identifying characteristics of a node.
 */
export interface NodeDescriptor {
  node_id: number;
  address: Addr;
  attrs: any;
}

/**
 * StoreDescriptor contains identifying characteristics of a store.
 */
export interface StoreDescriptor {
  store_id: number;
  node: NodeDescriptor;
  attrs: any;
  capacity: StoreCapacity;
}

/*****************************
 * build/info.proto
 ****************************/
export interface BuildInfo {
  goVersion: string;
  tag: string;
  time: string;
  deps: string;
  platform: string;
  cgoCompiler: string;
}

/*****************************
 * server/status/status.proto
 ****************************/

/**
 * StatusMetrics is a string-keyed collection of metric values.
 */
export interface StatusMetrics {
  [metric: string]: number;
}

/**
 * StoreStatus describes the current status of a store.
 */
export interface StoreStatus {
  desc: StoreDescriptor;
  metrics: StatusMetrics;
}

/**
 * NodeStatus describes the high-level current status of a Node.
 */
export interface NodeStatus {
  desc: NodeDescriptor;
  build_info: BuildInfo;
  started_at: number;
  updated_at: number;
  metrics: StatusMetrics;
  store_statuses: {[storeid: string]: StoreStatus};
}

/*****************************
 * ts/timeseries.proto
 ****************************/

/**
 * QueryAggregator is an enumeration of the available aggregator
 * functions for time series queries.
 *
 * Source message = "TimeSeriesQueryAggregator"
 */
export enum QueryAggregator {
  AVG = 1,
  SUM = 2,
  MAX = 3,
  MIN = 4,
}

/**
 * QueryAggregator is an enumeration of the available derivative
 * functions for time series queries.
 *
 * Source message = "TimeSeriesQueryDerivative"
 */
export enum QueryDerivative {
  NONE = 0,
  DERIVATIVE = 1,
  NON_NEGATIVE_DERIVATIVE = 2,
}

/**
 * Datapoint is a single datapoint in a query response.
 *
 * Source message = "TimeSeriesDatapoint"
 */
export interface Datapoint {
  timestamp_nanos: number;
  value: number;
}

/**
 * QueryResult is a single query result.
 *
 * No direct source message. Historical relic.
 */
export interface QueryResult {
  name: string;
  downsampler: QueryAggregator;
  source_aggregator: QueryAggregator;
  derivative: QueryDerivative;
  datapoints: Datapoint[];
}

/**
 * Result is a single query result.
 *
 * Source message = "TimeSeriesQueryResponse.Result"
 */
export interface Result {
  datapoints: Datapoint[];
  query: QueryRequest;
}

/**
 * Results matches the successful output of the /ts/query
 * endpoint.
 *
 * Source message = "TimeSeriesQueryResponse"
 */
export interface Results {
  results: Result[];
}

/**
 * QueryRequest is a single query request as expected by the server.
 *
 * Source message = "TimeSeriesQueryRequest.Query"
 */
export interface QueryRequest {
  name: string;
  sources: string[];
  downsampler: QueryAggregator;
  source_aggregator: QueryAggregator;
  derivative: QueryDerivative;
}

/**
 * QueryRequestSet matches the expected input of the /ts/query endpoint.
 *
 * Source message = "TimeSeriesQueryRequest"
 */
export interface QueryRequestSet {
  start_nanos: number;
  end_nanos: number;
  queries: QueryRequest[];
}

/*****************************
 * util/log/log.proto
 ****************************/

/**
 * Arg represents an argument passed to a log entry.
 *
 * Source message = "LogEntry.Arg"
 */
export interface Arg {
  type: string;
  str: string;
  json: string;
}

/**
 * LogEntry represents a cockroach structured log entry.
 *
 * Source message = "LogEntry"
 */
export interface LogEntry {
  severity: number;
  time: number;
  file: string;
  line: number;
  format: string;
}

/*****************************
 * server/admin.proto
 ****************************/

export interface Timestamp {
  sec?: number;
  nsec?: number;
}

export interface DatabaseList {
  databases: string[];
}

export interface Grant {
  database: string;
  privileges: string[];
  user: string;
}

export interface Database {
  grants: Grant[];
  table_names: string[];
}

export interface SQLColumn {
  name: string;
  type: string;
  nullable: boolean;
  default: string;
}

export interface SQLIndex {
  name: string;
  unique: boolean;
  seq: number;
  column: string;
  direction: string;
  storing: boolean;
}

export interface SQLTable {
  grants: Grant[];
  columns: SQLColumn[];
  indexes: SQLIndex[];
  range_count: number;
}

export interface User {
  username: string;
}

export interface Users {
  users: User[];
}

export interface UnparsedClusterEvent {
  timestamp: Timestamp;
  event_type: string;
  target_id: number;
  reporting_id: number;
  info: string;
}

export interface UnparsedClusterEvents {
  events: UnparsedClusterEvent[];
}

export interface EventInfo {
  DatabaseName?: string;
  TableName?: string;
  User?: string;
  Statement?: string;
  DroppedTables?: string[];
}

export interface SetUIDataRequest {
  key: string;
  value: string; // base64 encoded value
}

export interface GetUIDataRequest {
  key: string;
}

interface UIDataValue {
  value: string; // base64 encoded value
  last_updated: Timestamp;
}

export interface GetUIDataResponse {
  key_values: {[key: string]: UIDataValue};
}