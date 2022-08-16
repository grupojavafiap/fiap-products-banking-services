export class ArrayUtil
{

    /**
     * Quebra o array passado, em vários arrays conforme o tamanho passado.
     * 
     * @param objetcs 
     * @param sizeArray 
     * @returns 
     */
    static chunkArray(objetcs:Array<any>, sizeArray:number)
    {
        const arrayLength = objetcs.length;
        const newArray = new Array<any>();
        
        for (let index = 0; index < arrayLength; index += sizeArray) 
        {
            const myChunk = objetcs.slice(index, index + sizeArray);
            newArray.push(myChunk);
        }
    
        return newArray;
    }
}