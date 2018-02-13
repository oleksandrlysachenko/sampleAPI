// Server:
process.env.SERVER_HOST = '127.0.0.1';
process.env.SERVER_PORT = 8025;

// MongoDB:
process.env.DB_HOST = '127.0.0.1';
process.env.DB_PORT = 27017;
process.env.DB_NAME = 'sampleAPI';

process.env.UPLOADER_TYPE = 'FileSystem';
process.env.FILESYSTEM_BUCKET = 'public/uploads/' + process.env.NODE_ENV.toLowerCase();

// Session max age:
process.env.SESSION_MAX_AGE = 24 * 60 * 60 * 1000;
