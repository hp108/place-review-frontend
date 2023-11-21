import axios from "axios";
import { useCallback, useState } from "react";


export const useHttpClient=()=>{

    const [isLoading,setisLoading]= useState(false);
    const [isError,setisError]= useState(null);

    const clearError = ()=>{
        setisError(null)
    }

    const sendRequest = useCallback( async(url,method='get',body=null,headers=null)=>{
        let response;
        try{
        setisLoading(true)
        if(method==='delete')
        {
            response= await axios[method](url,{headers:headers});
        }
        else{
            response = await axios[method](url,body,{headers:headers});
        }
        setisLoading(false)
        return response;
        }
        catch(err)
        {
            setisLoading(false)
            setisError(err.response.data.message|| err.message)
        }
    },[])
    return {isError,isLoading,sendRequest,clearError}
}