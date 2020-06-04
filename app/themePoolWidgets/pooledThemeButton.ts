import { ThemeDatum } from "../themeDatum";

export class PooledThemeButton
{
    private buttonGroup: HTMLDivElement;
    private button: HTMLButtonElement;
    private themeData: ThemeDatum;

    public static CreatePooledThemeButton( themeData: ThemeDatum, onClickedCallback?: (clickEvent: MouseEvent) => void ): PooledThemeButton
    {
        const newThemeButton: PooledThemeButton = new PooledThemeButton();

        const buttonElement: HTMLButtonElement = document.createElement( "button" );
        buttonElement.setAttribute( "type", "button" );
        buttonElement.classList.add( "btn", "btn-outline-secondary", "py-3", "text-capitalize" );
        buttonElement.innerText = themeData.GetThemeName();

        buttonElement.addEventListener( "click", ( event: MouseEvent ) => //newThemeButton.OnPooledThemeButtonClicked );
        {
            console.log( newThemeButton.themeData );

            if ( onClickedCallback )
            {
                onClickedCallback( event );
            }
        } );

        const buttonGroup: HTMLDivElement = document.createElement( "div" );
        buttonGroup.setAttribute( "role", "group" );
        buttonGroup.classList.add( "btn-group", "p-2" );
        buttonGroup.appendChild( buttonElement );

        newThemeButton.themeData = themeData;
        newThemeButton.button = buttonElement;
        newThemeButton.buttonGroup = buttonGroup;
        return newThemeButton;
    }

    private OnPooledThemeButtonClicked( event: MouseEvent )
    {
        console.log( this );
        console.log( this.button.innerText );
        console.log( this.themeData );
    }

    public SetParent( parentElement: HTMLElement )
    {
        parentElement.appendChild( this.buttonGroup );
    }
}