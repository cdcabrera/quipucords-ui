const API_QUERY_TYPES = {
  CREDENTIAL_TYPE: 'cred_type',
  ORDERING: 'ordering',
  ORDERING_ASC: 'asc',
  ORDERING_DSC: 'dsc',
  PAGE: 'page',
  PAGE_SIZE: 'page_size',
  SCAN_TYPE: 'scan_type',
  SEARCH_CREDENTIALS_NAME: 'search_credentials_by_name',
  SEARCH_NAME: 'search_by_name',
  SEARCH_SOURCES_NAME: 'search_sources_by_name',
  SOURCE_TYPE: 'source_type',

  AUTH_TOKEN: 'auth_token',
  BECOME_METHOD: 'become_method',
  BECOME_PASSWORD: 'become_password',
  BECOME_USER: 'become_user',
  ID: 'id',
  NAME: 'name',
  PASSWORD: 'password',
  SSH_KEYFILE: 'ssh_keyfile',
  SSH_PASSPHRASE: 'sshpassphrase',
  USERNAME: 'username'
};

const API_QUERY_SORT_TYPES = {
  CREDENTIAL_TYPE: 'cred_type',
  MOST_RECENT_CONNECT_SCAN_START_TIME: 'most_recent_connect_scan__start_time',
  MOST_RECENT_SCANJOB_START_TIME: 'most_recent_scanjob__start_time',
  NAME: 'name',
  SOURCE_TYPE: 'source_type'
};

const API_QUERY_PAGE = 'page';
const API_QUERY_PAGE_SIZE = 'page_size';
const API_QUERY_ORDERING = 'ordering';

const API_QUERY_SOURCE_TYPE = 'source_type';
const API_QUERY_STATUS = 'status';

const API_RESPONSE_CREDENTIAL_CRED_TYPE = 'cred_type';
const API_RESPONSE_CREDENTIAL_NAME = 'name';
const API_RESPONSE_CREDENTIAL_ID = 'id';
const API_RESPONSE_CREDENTIAL_SOURCES = 'sources';
const API_RESPONSE_CREDENTIAL_SOURCES_NAME = 'name';
const API_RESPONSE_CREDENTIAL_SOURCES_SOURCE_TYPE = 'source_type';
const API_RESPONSE_CREDENTIAL_SSH_KEYFILE = 'ssh_keyfile';

const API_RESPONSE_CREDENTIALS_COUNT = 'count';
const API_RESPONSE_CREDENTIALS_RESULTS = 'results';

const API_RESPONSE_SCAN_ID = 'id';
const API_RESPONSE_SCAN_JOBS = 'jobs';
const API_RESPONSE_SCAN_MOST_RECENT = 'most_recent';
const API_RESPONSE_SCAN_MOST_RECENT_ID = 'id';
const API_RESPONSE_SCAN_MOST_RECENT_REPORT_ID = 'report_id';
const API_RESPONSE_SCAN_MOST_RECENT_START_TIME = 'start_time';
const API_RESPONSE_SCAN_MOST_RECENT_END_TIME = 'end_time';
const API_RESPONSE_SCAN_MOST_RECENT_STATUS = 'status';
const API_RESPONSE_SCAN_MOST_RECENT_SYS_SCANNED = 'systems_scanned';
const API_RESPONSE_SCAN_MOST_RECENT_SYS_FAILED = 'systems_failed';
const API_RESPONSE_SCAN_MOST_RECENT_STATUS_DETAILS = 'status_details';
const API_RESPONSE_SCAN_MOST_RECENT_STATUS_DETAILS_MESSAGE = 'job_status_message';
const API_RESPONSE_SCAN_NAME = 'name';
const API_RESPONSE_SCAN_SOURCES = 'sources';

const API_RESPONSE_SCANS_COUNT = 'count';
const API_RESPONSE_SCANS_RESULTS = 'results';

const API_RESPONSE_JOB_ID = 'id';
const API_RESPONSE_JOB_REPORT_ID = 'report_id';
const API_RESPONSE_JOB_START_TIME = 'start_time';
const API_RESPONSE_JOB_END_TIME = 'end_time';
const API_RESPONSE_JOB_SCAN = 'scan';
const API_RESPONSE_JOB_SCAN_NAME = 'name';
const API_RESPONSE_JOB_STATUS = 'status';
const API_RESPONSE_JOB_SYS_SCANNED = 'systems_scanned';
const API_RESPONSE_JOB_SYS_FAILED = 'systems_failed';
const API_RESPONSE_JOB_SOURCES = 'sources';
const API_RESPONSE_JOB_SOURCES_ID = 'id';
const API_RESPONSE_JOB_SOURCES_NAME = 'name';
const API_RESPONSE_JOB_SOURCES_SOURCE_TYPE = 'source_type';
const API_RESPONSE_JOB_TASKS = 'tasks';
const API_RESPONSE_JOB_TASKS_SOURCE = 'source';
const API_RESPONSE_JOB_TASKS_SCAN_TYPE = 'scan_type';
const API_RESPONSE_JOB_TASKS_STATUS = 'status';
const API_RESPONSE_JOB_TASKS_STATUS_MESSAGE = 'status_message';

const API_RESPONSE_JOB_CREDENTIAL = 'credential';
const API_RESPONSE_JOB_CREDENTIAL_NAME = 'name';
const API_RESPONSE_JOB_NAME = 'name';
const API_RESPONSE_JOB_SOURCE = 'source';
const API_RESPONSE_JOB_SOURCE_ID = 'id';
const API_RESPONSE_JOB_SOURCE_NAME = 'name';

const API_RESPONSE_JOBS_COUNT = 'count';
const API_RESPONSE_JOBS_NEXT = 'next';
const API_RESPONSE_JOBS_RESULTS = 'results';

const API_RESPONSE_REPORTS_REPORT_ID = 'report_id';

const API_RESPONSE_SOURCE_CONNECTION = 'connection';
const API_RESPONSE_SOURCE_CONNECTION_END_TIME = 'end_time';
const API_RESPONSE_SOURCE_CONNECTION_ID = 'id';
const API_RESPONSE_SOURCE_CONNECTION_START_TIME = 'start_time';
const API_RESPONSE_SOURCE_CONNECTION_STATUS = 'status';
const API_RESPONSE_SOURCE_CONNECTION_SYS_FAILED = 'source_systems_failed';
const API_RESPONSE_SOURCE_CONNECTION_SYS_SCANNED = 'source_systems_scanned';
const API_RESPONSE_SOURCE_CONNECTION_SYS_UNREACHABLE = 'source_systems_unreachable';
const API_RESPONSE_SOURCE_CREDENTIALS = 'credentials';
const API_RESPONSE_SOURCE_CREDENTIALS_ID = 'id';
const API_RESPONSE_SOURCE_CREDENTIALS_NAME = 'name';
const API_RESPONSE_SOURCE_HOSTS = 'hosts';
const API_RESPONSE_SOURCE_ID = 'id';
const API_RESPONSE_SOURCE_NAME = 'name';
const API_RESPONSE_SOURCE_OPTIONS = 'options';
const API_RESPONSE_SOURCE_OPTIONS_SSL_CERT = 'ssl_cert_verify';
const API_RESPONSE_SOURCE_OPTIONS_SSL_PROTOCOL = 'ssl_protocol';
const API_RESPONSE_SOURCE_OPTIONS_DISABLE_SSL = 'disable_ssl';
const API_RESPONSE_SOURCE_OPTIONS_PARAMIKO = 'use_paramiko';
const API_RESPONSE_SOURCE_PORT = 'port';
const API_RESPONSE_SOURCE_SOURCE_TYPE = 'source_type';

const API_RESPONSE_SOURCES_COUNT = 'count';
const API_RESPONSE_SOURCES_RESULTS = 'results';

const API_RESPONSE_STATUS_API_VERSION = 'api_version';
const API_RESPONSE_STATUS_BUILD = 'build';
const API_RESPONSE_STATUS_SERVER_VERSION = 'server_version';

const API_RESPONSE_USER_USERNAME = 'username';

const API_SUBMIT_REPORTS_REPORTS = 'reports';

const API_SUBMIT_SCAN_NAME = 'name';
const API_SUBMIT_SCAN_OPTIONS = 'options';
const API_SUBMIT_SCAN_OPTIONS_MAX_CONCURRENCY = 'max_concurrency';
const API_SUBMIT_SCAN_OPTIONS_EXTENDED_SEARCH = 'enabled_extended_product_search';
const API_SUBMIT_SCAN_OPTIONS_EXTENDED_SEARCH_BRMS = 'jboss_brms';
const API_SUBMIT_SCAN_OPTIONS_EXTENDED_SEARCH_DIRS = 'search_directories';
const API_SUBMIT_SCAN_OPTIONS_EXTENDED_SEARCH_EAP = 'jboss_eap';
const API_SUBMIT_SCAN_OPTIONS_EXTENDED_SEARCH_FUSE = 'jboss_fuse';
const API_SUBMIT_SCAN_OPTIONS_EXTENDED_SEARCH_WS = 'jboss_ws';
const API_SUBMIT_SCAN_SOURCES = 'sources';

const API_SUBMIT_SOURCE_CREDENTIALS = 'credentials';
const API_SUBMIT_SOURCE_HOSTS = 'hosts';
const API_SUBMIT_SOURCE_ID = 'id';
const API_SUBMIT_SOURCE_NAME = 'name';
const API_SUBMIT_SOURCE_OPTIONS = 'options';
const API_SUBMIT_SOURCE_OPTIONS_SSL_CERT = 'ssl_cert_verify';
const API_SUBMIT_SOURCE_OPTIONS_SSL_PROTOCOL = 'ssl_protocol';
const API_SUBMIT_SOURCE_OPTIONS_DISABLE_SSL = 'disable_ssl';
const API_SUBMIT_SOURCE_OPTIONS_PARAMIKO = 'use_paramiko';
const API_SUBMIT_SOURCE_PORT = 'port';
const API_SUBMIT_SOURCE_SOURCE_TYPE = 'source_type';

const apiTypes = {
  API_QUERY_TYPES,
  API_QUERY_SORT_TYPES,
  API_QUERY_PAGE,
  API_QUERY_PAGE_SIZE,
  API_QUERY_ORDERING,
  API_QUERY_SOURCE_TYPE,
  API_QUERY_STATUS,
  API_RESPONSE_CREDENTIAL_CRED_TYPE,
  API_RESPONSE_CREDENTIAL_NAME,
  API_RESPONSE_CREDENTIAL_ID,
  API_RESPONSE_CREDENTIAL_SOURCES,
  API_RESPONSE_CREDENTIAL_SSH_KEYFILE,
  API_RESPONSE_CREDENTIAL_SOURCES_NAME,
  API_RESPONSE_CREDENTIAL_SOURCES_SOURCE_TYPE,
  API_RESPONSE_CREDENTIALS_COUNT,
  API_RESPONSE_CREDENTIALS_RESULTS,
  API_RESPONSE_SCAN_ID,
  API_RESPONSE_SCAN_JOBS,
  API_RESPONSE_SCAN_MOST_RECENT,
  API_RESPONSE_SCAN_MOST_RECENT_ID,
  API_RESPONSE_SCAN_MOST_RECENT_REPORT_ID,
  API_RESPONSE_SCAN_MOST_RECENT_START_TIME,
  API_RESPONSE_SCAN_MOST_RECENT_END_TIME,
  API_RESPONSE_SCAN_MOST_RECENT_STATUS,
  API_RESPONSE_SCAN_MOST_RECENT_SYS_SCANNED,
  API_RESPONSE_SCAN_MOST_RECENT_SYS_FAILED,
  API_RESPONSE_SCAN_MOST_RECENT_STATUS_DETAILS,
  API_RESPONSE_SCAN_MOST_RECENT_STATUS_DETAILS_MESSAGE,
  API_RESPONSE_SCAN_NAME,
  API_RESPONSE_SCAN_SOURCES,
  API_RESPONSE_SCANS_COUNT,
  API_RESPONSE_SCANS_RESULTS,
  API_RESPONSE_JOB_ID,
  API_RESPONSE_JOB_REPORT_ID,
  API_RESPONSE_JOB_START_TIME,
  API_RESPONSE_JOB_END_TIME,
  API_RESPONSE_JOB_SCAN,
  API_RESPONSE_JOB_SCAN_NAME,
  API_RESPONSE_JOB_STATUS,
  API_RESPONSE_JOB_SYS_SCANNED,
  API_RESPONSE_JOB_SYS_FAILED,
  API_RESPONSE_JOB_SOURCES,
  API_RESPONSE_JOB_SOURCES_ID,
  API_RESPONSE_JOB_SOURCES_NAME,
  API_RESPONSE_JOB_SOURCES_SOURCE_TYPE,
  API_RESPONSE_JOB_TASKS,
  API_RESPONSE_JOB_TASKS_SOURCE,
  API_RESPONSE_JOB_TASKS_SCAN_TYPE,
  API_RESPONSE_JOB_TASKS_STATUS,
  API_RESPONSE_JOB_TASKS_STATUS_MESSAGE,
  API_RESPONSE_JOB_CREDENTIAL,
  API_RESPONSE_JOB_CREDENTIAL_NAME,
  API_RESPONSE_JOB_NAME,
  API_RESPONSE_JOB_SOURCE,
  API_RESPONSE_JOB_SOURCE_ID,
  API_RESPONSE_JOB_SOURCE_NAME,
  API_RESPONSE_JOBS_COUNT,
  API_RESPONSE_JOBS_NEXT,
  API_RESPONSE_JOBS_RESULTS,
  API_RESPONSE_REPORTS_REPORT_ID,
  API_RESPONSE_SOURCE_CONNECTION,
  API_RESPONSE_SOURCE_CONNECTION_END_TIME,
  API_RESPONSE_SOURCE_CONNECTION_ID,
  API_RESPONSE_SOURCE_CONNECTION_START_TIME,
  API_RESPONSE_SOURCE_CONNECTION_STATUS,
  API_RESPONSE_SOURCE_CONNECTION_SYS_FAILED,
  API_RESPONSE_SOURCE_CONNECTION_SYS_SCANNED,
  API_RESPONSE_SOURCE_CONNECTION_SYS_UNREACHABLE,
  API_RESPONSE_SOURCE_CREDENTIALS,
  API_RESPONSE_SOURCE_CREDENTIALS_ID,
  API_RESPONSE_SOURCE_CREDENTIALS_NAME,
  API_RESPONSE_SOURCE_HOSTS,
  API_RESPONSE_SOURCE_ID,
  API_RESPONSE_SOURCE_NAME,
  API_RESPONSE_SOURCE_OPTIONS,
  API_RESPONSE_SOURCE_OPTIONS_SSL_CERT,
  API_RESPONSE_SOURCE_OPTIONS_SSL_PROTOCOL,
  API_RESPONSE_SOURCE_OPTIONS_DISABLE_SSL,
  API_RESPONSE_SOURCE_OPTIONS_PARAMIKO,
  API_RESPONSE_SOURCE_PORT,
  API_RESPONSE_SOURCE_SOURCE_TYPE,
  API_RESPONSE_SOURCES_COUNT,
  API_RESPONSE_SOURCES_RESULTS,
  API_RESPONSE_STATUS_API_VERSION,
  API_RESPONSE_STATUS_BUILD,
  API_RESPONSE_STATUS_SERVER_VERSION,
  API_RESPONSE_USER_USERNAME,
  API_SUBMIT_REPORTS_REPORTS,
  API_SUBMIT_SCAN_NAME,
  API_SUBMIT_SCAN_OPTIONS,
  API_SUBMIT_SCAN_OPTIONS_MAX_CONCURRENCY,
  API_SUBMIT_SCAN_OPTIONS_EXTENDED_SEARCH,
  API_SUBMIT_SCAN_OPTIONS_EXTENDED_SEARCH_BRMS,
  API_SUBMIT_SCAN_OPTIONS_EXTENDED_SEARCH_DIRS,
  API_SUBMIT_SCAN_OPTIONS_EXTENDED_SEARCH_EAP,
  API_SUBMIT_SCAN_OPTIONS_EXTENDED_SEARCH_FUSE,
  API_SUBMIT_SCAN_OPTIONS_EXTENDED_SEARCH_WS,
  API_SUBMIT_SCAN_SOURCES,
  API_SUBMIT_SOURCE_CREDENTIALS,
  API_SUBMIT_SOURCE_HOSTS,
  API_SUBMIT_SOURCE_ID,
  API_SUBMIT_SOURCE_NAME,
  API_SUBMIT_SOURCE_OPTIONS,
  API_SUBMIT_SOURCE_OPTIONS_SSL_CERT,
  API_SUBMIT_SOURCE_OPTIONS_SSL_PROTOCOL,
  API_SUBMIT_SOURCE_OPTIONS_DISABLE_SSL,
  API_SUBMIT_SOURCE_OPTIONS_PARAMIKO,
  API_SUBMIT_SOURCE_PORT,
  API_SUBMIT_SOURCE_SOURCE_TYPE
};

export {
  apiTypes as default,
  apiTypes,
  API_QUERY_TYPES,
  API_QUERY_SORT_TYPES,
  API_QUERY_PAGE,
  API_QUERY_PAGE_SIZE,
  API_QUERY_ORDERING,
  API_QUERY_SOURCE_TYPE,
  API_QUERY_STATUS,
  API_RESPONSE_CREDENTIAL_CRED_TYPE,
  API_RESPONSE_CREDENTIAL_NAME,
  API_RESPONSE_CREDENTIAL_ID,
  API_RESPONSE_CREDENTIAL_SOURCES,
  API_RESPONSE_CREDENTIAL_SSH_KEYFILE,
  API_RESPONSE_CREDENTIAL_SOURCES_NAME,
  API_RESPONSE_CREDENTIAL_SOURCES_SOURCE_TYPE,
  API_RESPONSE_CREDENTIALS_COUNT,
  API_RESPONSE_CREDENTIALS_RESULTS,
  API_RESPONSE_SCAN_ID,
  API_RESPONSE_SCAN_JOBS,
  API_RESPONSE_SCAN_MOST_RECENT,
  API_RESPONSE_SCAN_MOST_RECENT_ID,
  API_RESPONSE_SCAN_MOST_RECENT_REPORT_ID,
  API_RESPONSE_SCAN_MOST_RECENT_START_TIME,
  API_RESPONSE_SCAN_MOST_RECENT_END_TIME,
  API_RESPONSE_SCAN_MOST_RECENT_STATUS,
  API_RESPONSE_SCAN_MOST_RECENT_SYS_SCANNED,
  API_RESPONSE_SCAN_MOST_RECENT_SYS_FAILED,
  API_RESPONSE_SCAN_MOST_RECENT_STATUS_DETAILS,
  API_RESPONSE_SCAN_MOST_RECENT_STATUS_DETAILS_MESSAGE,
  API_RESPONSE_SCAN_NAME,
  API_RESPONSE_SCAN_SOURCES,
  API_RESPONSE_SCANS_COUNT,
  API_RESPONSE_SCANS_RESULTS,
  API_RESPONSE_JOB_ID,
  API_RESPONSE_JOB_REPORT_ID,
  API_RESPONSE_JOB_START_TIME,
  API_RESPONSE_JOB_END_TIME,
  API_RESPONSE_JOB_SCAN,
  API_RESPONSE_JOB_SCAN_NAME,
  API_RESPONSE_JOB_STATUS,
  API_RESPONSE_JOB_SYS_SCANNED,
  API_RESPONSE_JOB_SYS_FAILED,
  API_RESPONSE_JOB_SOURCES,
  API_RESPONSE_JOB_SOURCES_ID,
  API_RESPONSE_JOB_SOURCES_NAME,
  API_RESPONSE_JOB_SOURCES_SOURCE_TYPE,
  API_RESPONSE_JOB_TASKS,
  API_RESPONSE_JOB_TASKS_SOURCE,
  API_RESPONSE_JOB_TASKS_SCAN_TYPE,
  API_RESPONSE_JOB_TASKS_STATUS,
  API_RESPONSE_JOB_TASKS_STATUS_MESSAGE,
  API_RESPONSE_JOB_CREDENTIAL,
  API_RESPONSE_JOB_CREDENTIAL_NAME,
  API_RESPONSE_JOB_NAME,
  API_RESPONSE_JOB_SOURCE,
  API_RESPONSE_JOB_SOURCE_ID,
  API_RESPONSE_JOB_SOURCE_NAME,
  API_RESPONSE_JOBS_COUNT,
  API_RESPONSE_JOBS_NEXT,
  API_RESPONSE_JOBS_RESULTS,
  API_RESPONSE_REPORTS_REPORT_ID,
  API_RESPONSE_SOURCE_CONNECTION,
  API_RESPONSE_SOURCE_CONNECTION_END_TIME,
  API_RESPONSE_SOURCE_CONNECTION_ID,
  API_RESPONSE_SOURCE_CONNECTION_START_TIME,
  API_RESPONSE_SOURCE_CONNECTION_STATUS,
  API_RESPONSE_SOURCE_CONNECTION_SYS_FAILED,
  API_RESPONSE_SOURCE_CONNECTION_SYS_SCANNED,
  API_RESPONSE_SOURCE_CONNECTION_SYS_UNREACHABLE,
  API_RESPONSE_SOURCE_CREDENTIALS,
  API_RESPONSE_SOURCE_CREDENTIALS_ID,
  API_RESPONSE_SOURCE_CREDENTIALS_NAME,
  API_RESPONSE_SOURCE_HOSTS,
  API_RESPONSE_SOURCE_ID,
  API_RESPONSE_SOURCE_NAME,
  API_RESPONSE_SOURCE_OPTIONS,
  API_RESPONSE_SOURCE_OPTIONS_SSL_CERT,
  API_RESPONSE_SOURCE_OPTIONS_SSL_PROTOCOL,
  API_RESPONSE_SOURCE_OPTIONS_DISABLE_SSL,
  API_RESPONSE_SOURCE_OPTIONS_PARAMIKO,
  API_RESPONSE_SOURCE_PORT,
  API_RESPONSE_SOURCE_SOURCE_TYPE,
  API_RESPONSE_SOURCES_COUNT,
  API_RESPONSE_SOURCES_RESULTS,
  API_RESPONSE_STATUS_API_VERSION,
  API_RESPONSE_STATUS_BUILD,
  API_RESPONSE_STATUS_SERVER_VERSION,
  API_RESPONSE_USER_USERNAME,
  API_SUBMIT_REPORTS_REPORTS,
  API_SUBMIT_SCAN_NAME,
  API_SUBMIT_SCAN_OPTIONS,
  API_SUBMIT_SCAN_OPTIONS_MAX_CONCURRENCY,
  API_SUBMIT_SCAN_OPTIONS_EXTENDED_SEARCH,
  API_SUBMIT_SCAN_OPTIONS_EXTENDED_SEARCH_BRMS,
  API_SUBMIT_SCAN_OPTIONS_EXTENDED_SEARCH_DIRS,
  API_SUBMIT_SCAN_OPTIONS_EXTENDED_SEARCH_EAP,
  API_SUBMIT_SCAN_OPTIONS_EXTENDED_SEARCH_FUSE,
  API_SUBMIT_SCAN_OPTIONS_EXTENDED_SEARCH_WS,
  API_SUBMIT_SCAN_SOURCES,
  API_SUBMIT_SOURCE_CREDENTIALS,
  API_SUBMIT_SOURCE_HOSTS,
  API_SUBMIT_SOURCE_ID,
  API_SUBMIT_SOURCE_NAME,
  API_SUBMIT_SOURCE_OPTIONS,
  API_SUBMIT_SOURCE_OPTIONS_SSL_CERT,
  API_SUBMIT_SOURCE_OPTIONS_SSL_PROTOCOL,
  API_SUBMIT_SOURCE_OPTIONS_DISABLE_SSL,
  API_SUBMIT_SOURCE_OPTIONS_PARAMIKO,
  API_SUBMIT_SOURCE_PORT,
  API_SUBMIT_SOURCE_SOURCE_TYPE
};
