var a = new Array(10000)
for(var i=0;i<a.length;i++)
{
    a[i] = i;
}
a.forEach(key=>console.log(key))
console.log(1)