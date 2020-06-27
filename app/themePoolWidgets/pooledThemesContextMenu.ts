import { Action } from "../utility/actions";
import { IEvent } from "../utility/actions";
import { gameJamState } from "../appState/gameJamState";
import { ThemeDatum } from "../themeDatum";

type PanelOption = "#cancel" | "#reroll" | "#rename" | "#delete"

export class PooledThemesContextMenu
{
    private menuContainer: HTMLDivElement;
    private selectedThemeLabel: HTMLParagraphElement;
    private selectedTheme: ThemeDatum = ThemeDatum.Empty;

    public constructor()
    {
        this.menuContainer = <HTMLDivElement>document.getElementById( "themePoolContext" );
        this.selectedThemeLabel = <HTMLParagraphElement>document.getElementById( "selectedTheme" );

        const contextOptions: HTMLCollection = this.menuContainer.getElementsByClassName( "list-group-item" );
        this.AttachContextOptionEvents( contextOptions );
    }

    private AttachContextOptionEvents( optionElements: HTMLCollection )
    {
        for ( var idx: number = 0; idx < optionElements.length; ++idx )
        {
            const optionElement: Element = optionElements[idx];
            const optionRef: PanelOption | null = optionElement.getAttribute( "href" ) as PanelOption;
            this.DisplayContextOnHover(optionElement, optionRef);

            switch ( optionRef )
            {
                default:
                case "#cancel":
                    optionElement.addEventListener( "click", this.OnCanceled );
                    break;
                
                case "#reroll":
                    optionElement.addEventListener( "click", this.OnRerolled );
                    break;
                
                case "#rename":
                    optionElement.addEventListener( "click", this.OnRenamed );
                    break;
                
                case "#delete":
                    optionElement.addEventListener( "click", this.OnDeleted );
                    break;
            }
        }
    }

    private OnCanceled = ( event: Event ) =>
    {
        this.LogSelectedContext( event );

        this.Hide();
    }

    private OnRerolled = ( event: Event ) =>
    {
        gameJamState.ReplaceTheme( this.selectedTheme );

        this.Hide();
    }

    private OnRenamed = ( event: Event ) =>
    {
        this.LogSelectedContext( event );

        this.Hide();
    }

    private OnDeleted = ( event: Event ) =>
    {
        gameJamState.DeleteTheme( this.selectedTheme );

        this.Hide();
    }

    public Hide()
    {
        gameJamState.OnPooledThemeContextClosedEvent.Invoke();

        this.selectedTheme = ThemeDatum.Empty;
        this.menuContainer.classList.add( "d-none" );
    }

    public Show()
    {
        gameJamState.OnPooledThemeContextOpenedEvent.Invoke();

        this.menuContainer.classList.remove( "d-none" );
    }

    public SetTheme( theme: ThemeDatum )
    {
        this.selectedTheme = theme;
        this.selectedThemeLabel.innerText = theme.ThemeName;
    }


    private LogSelectedContext( event: Event )
    {
        const element: HTMLElement = event.target as HTMLElement;
        const optionRef: string | null = element?.getAttribute( "href" );

        console.log( optionRef );
    }

    private DisplayContextOnHover = ( optionElement: Element, optionRef: PanelOption = '#cancel' ) => {        
        const optionContext = this.menuContainer.querySelector(`[role="tabpanel"]${optionRef}`);
        optionElement.addEventListener( "mouseover", show );
        optionElement.addEventListener( "mouseout", hide );

        // TODO: break these out into a more reusable area like a util or create an OptionTab class that would manage all this
        function show() {
            optionContext?.classList.add( "show" );
            optionElement.classList.add( "show" );
            optionContext?.classList.add( "active" );
            optionElement.classList.add( "active" );
        }

        function hide() {
            optionContext?.classList.remove( "show" );
            optionElement.classList.remove( "show" );
            optionContext?.classList.remove( "active" );
            optionElement.classList.remove( "active" );
        }
    }
}