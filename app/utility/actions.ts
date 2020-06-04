export interface IEvent<T>
{
    Subscribe( callback: ( ( data: T ) => void ) ) : void;
    Unsubscribe( callback: ( ( data: T ) => void ) ) : void;
}

export class Action<T> implements IEvent<T>
{
    private handlers: ( ( data: T ) => void )[] = [];

    public Subscribe( callback: ( ( data: T ) => void ) )
    {
        this.handlers.push( callback );
    }

    public Unsubscribe( callback: ( ( data: T ) => void ) )
    {
        for ( var idx: number = 0; idx < this.handlers.length; ++idx )
        {
            const handle: ( ( data: T ) => void ) = this.handlers[idx];
            if ( handle === callback )
            {
                this.handlers.splice( idx, 1 );
                return;
            }
        }
    }

    public Invoke( data: T )
    {
        this.handlers.forEach( handle => handle( data ) );
    }

    public get AsEvent(): IEvent<T>
    {
        return this;
    }
}

export class SimpleAction extends Action<void>
{
}