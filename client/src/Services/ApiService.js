import axios from "axios";

const API_URL = process.env.OPENAI_REQUEST_URL;
const API_KEY = process.env.RAPIDAPI_OPENAI_POEMS_API_KEY;

const options = {
    method : 'POST',
    url:'https://open-ai21.p.rapidapi.com/conversationllama',
    headers:{
        'x-rapidapi-key':'8515fe827bmsh9c115eb34df3c3dp185d4bjsn102016f6dbc8',
        'x-rapidapi-host':'open-ai21.p.rapidapi.com',
        'content-type':'application/json'
    },
    data:{
        messages:[
            {
                role: 'user',
                content:'Hi, please write me a nice poem'
            }
        ]
    }
};

const fetchOpenAiPoems = async () =>{
    try{
        const response = await axios.request(options);
        return response.data;
    }catch(error){
        console.error("Error fetching data from openAI", error);
        throw error;
    }
};

export default fetchOpenAiPoems;