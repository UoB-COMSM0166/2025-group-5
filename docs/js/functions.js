// 读取json文件并返回
async function loadJsonData(jsonFile) 
{
    try 
    {
        const response = await fetch(jsonFile);
        if (!response.ok) 
        {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
        // console.log(jsonData.color); // for debug
    } 
    catch (error) 
    {
        console.error('There was a problem with the fetch operation:', error);
    }
}