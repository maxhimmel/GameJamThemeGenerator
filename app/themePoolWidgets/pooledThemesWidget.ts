import { ThemeDatum } from "../themeDatum";
import { PooledThemeButton } from "./pooledThemeButton";
import { PooledThemesContextMenu } from "./pooledThemesContextMenu";

export class PooledThemesWidget
{
    private layoutContainer: HTMLDivElement;
    private contextMenu: PooledThemesContextMenu;
    private selectedTheme: ThemeDatum;

    public constructor()
    {
        this.layoutContainer = <HTMLDivElement>document.getElementById( "themePoolLayout" );

        this.contextMenu = new PooledThemesContextMenu();
        this.contextMenu.Hide();

        this.contextMenu.OnOptionSelectedEvent.Subscribe( ( option: string ) =>
        {
            console.log( this );

            this.ShowPooledThemes();
        } );
    }

    // private OnContextOptionSelected( option: string )
    // {
    //     console.log( this );
    // }

    public PopulateThemes( themeData: ThemeDatum[] )
    {
        for ( var idx: number = 0; idx < themeData.length; idx++ )
        {
            const theme = themeData[idx];
            const newThemeButton = PooledThemeButton.CreatePooledThemeButton( theme, ( event: MouseEvent ) =>
            {
                this.selectedTheme = theme;

                this.HidePooledThemes();

                this.contextMenu.SetLabel( theme.GetThemeName() );
                this.contextMenu.Show();
            } );
            
            newThemeButton.SetParent( this.layoutContainer );
        }
    }

    private ShowPooledThemes()
    {
        this.layoutContainer.parentElement?.classList.remove( "d-none" );
    }

    private HidePooledThemes()
    {
        this.layoutContainer.parentElement?.classList.add( "d-none");
    }
}