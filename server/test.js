a = new Promise(async (res, rej) => {
    rej(123)
    res(456)
})

b = async function() 
{
    result = await a.catch(err=>console.log(err))
    console.log(result);
}

b()