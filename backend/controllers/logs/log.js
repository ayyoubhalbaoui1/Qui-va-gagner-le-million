const log = (data, logs) => {
    return new logs({
      time: new Date(),
      file: data.file,
      line: data.line,
      info: data.info,
      type: data.type,
    }).save();
  };
  
  module.exports = log;