const photos = {
  Contents: [
    {
      Key: "First",
    },
    {
      Key: "Second",
    },
  ],
};

export function listObjects() {
  const listObjects = new Promise((resolve, reject) => {
    resolve(photos.Contents);
  });

  return listObjects;
}

export function getSingleObject(key) {
  const getSingleObject = new Promise((resolve) => {
    resolve(`${key} TestReturnString`);
  });

  return getSingleObject;
}

export function saveObject(file) {
  const saveObject = new Promise((resolve) => {
    resolve("TestReturnString");
  });

  return saveObject;
}
