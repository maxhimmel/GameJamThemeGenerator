import { Random } from "./random";

export class ArrayUtility
{
    public static FisherYatesShuffle<T>( array: Array<T> )
    {
        for ( var idx: number = array.length - 1; idx > 0; --idx )
        {
            const randIdx: number = Random.Range( 0, idx + 1 );

            const temp: T = array[idx];
            array[idx] = array[randIdx];
            array[randIdx] = temp;
        }
    }

    public static Remove<T>( array: Array<T>, value: T )
    {
        const index: number = array.indexOf( value );
        if ( index >= 0 )
        {
            array.splice( index, 1 );
        }
    }
}