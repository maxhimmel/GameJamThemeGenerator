import { ThemeDatum } from "../themeDatum";
import { Action } from "../utility/actions";
import { gameJamState } from "../appState/gameJamState";

export class PooledThemeButton
{
    public get Theme(): ThemeDatum { return this.theme; }

    public get OnClickedEvent() { return this.onClickedEvent.AsEvent; }
    private onClickedEvent: Action<PooledThemeButton> = new Action<PooledThemeButton>();

    private buttonGroup: HTMLDivElement;
    private button: HTMLButtonElement;
    private theme: ThemeDatum = ThemeDatum.Empty;

    public constructor()
    {
        this.button = document.createElement( "button" );
        this.button.setAttribute( "type", "button" );
        this.button.classList.add( "btn", "btn-outline-secondary", "py-3", "text-capitalize" );

        this.button.addEventListener( "click", this.OnPooledThemeButtonClicked );

        this.buttonGroup = document.createElement( "div" );
        this.buttonGroup.setAttribute( "role", "group" );
        this.buttonGroup.classList.add( "btn-group", "p-2" );
        this.buttonGroup.appendChild( this.button );
    }

    private OnPooledThemeButtonClicked = ( event: MouseEvent ) =>
    {
        this.onClickedEvent.Invoke( this );
    }

    public SetTheme( theme: ThemeDatum )
    {
        this.theme = theme;
        this.button.innerText = theme.ThemeName;
    }

    public SetParent( parentElement: HTMLElement )
    {
        parentElement.appendChild( this.buttonGroup );
    }

    public RemoveElement()
    {
        this.buttonGroup.remove();
    }

    public Disable()
    {
        this.button.setAttribute( "disabled", "true" );
    }

    public MarkAsLoser()
    {
        this.button.classList.remove( "btn-outline-secondary" );
        this.button.classList.add( "btn-outline-danger" );
    }
}