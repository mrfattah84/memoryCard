const getID = async () => {
  return await fetch('https://cataas.com/cat?type=square&json=true')
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

export default getID;
