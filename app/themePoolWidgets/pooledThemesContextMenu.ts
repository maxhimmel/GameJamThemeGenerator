import { Action } from "../utility/actions";
import { IEvent } from "../utility/actions";
import { gameJamState } from "../appState/gameJamState";
import { ThemeDatum } from "../themeDatum";

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
            const optionRef: string | null = optionElement.getAttribute( "href" );

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
}