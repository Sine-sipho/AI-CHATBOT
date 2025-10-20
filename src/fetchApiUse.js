const url = `jfhjsjjs@34`;
// Creates an async function generateData
async function generateData() {
  // enables the try... catch... statement to handle errors
  try {
    //code that might cause an error
    const response = await fetch(url, {});
  } catch (error) {
    //code to handle errors
  }
}
