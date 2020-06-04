import { Action } from "../utility/actions";
import { IEvent } from "../utility/actions";

export class PooledThemesContextMenu
{
    public get OnOptionSelectedEvent(): IEvent<string> { return this.onOptionSelectedEvent.AsEvent; }
    private onOptionSelectedEvent: Action<string> = new Action<string>();

    private menuContainer: HTMLDivElement;
    private selectedThemeElement: HTMLParagraphElement;

    public constructor()
    {
        this.menuContainer = <HTMLDivElement>document.getElementById( "themePoolContext" );
        this.selectedThemeElement = <HTMLParagraphElement>document.getElementById( "selectedTheme" );

        const contextOptions: HTMLCollection = this.menuContainer.getElementsByClassName( "list-group-item" );
        
        for ( var idx: number = 0; idx < contextOptions.length; ++idx )
        {
            const optionElement: Element = contextOptions[idx];
            const optionRef: string | null = optionElement.getAttribute( "href" );

            optionElement.addEventListener( "click", ( event: Event ) =>
            {
                console.log( optionRef );
                this.Hide();

                if ( optionRef )
                {
                    this.onOptionSelectedEvent.Invoke( optionRef );
                }
            } );
        }
    }

    public SetLabel( label: string )
    {
        this.selectedThemeElement.innerText = label;
    }

    public Show()
    {
        this.menuContainer.classList.remove( "d-none" );
    }

    public Hide()
    {
        this.menuContainer.classList.add( "d-none" );
    }
}