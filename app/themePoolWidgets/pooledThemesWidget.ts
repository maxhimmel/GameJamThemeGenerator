import { ThemeDatum } from "../themeDatum";
import { PooledThemeButton } from "./pooledThemeButton";
import { PooledThemesContextMenu } from "./pooledThemesContextMenu";
import { gameJamState } from "../appState/gameJamState";
import { TourneyRound } from "../appState/tournament/tourneyRound";
import { ArrayUtility } from "../utility/arrayUtility";
import { VotingThemeButton } from "../votingWidgets/votingThemeButton";

export class PooledThemesWidget
{
    private layoutContainer: HTMLDivElement;
    private contextMenu: PooledThemesContextMenu;
    private pooledThemeButtons: { [id: number]: PooledThemeButton } = {};

    public constructor()
    {
        this.layoutContainer = <HTMLDivElement>document.getElementById( "themePoolLayout" );

        this.contextMenu = new PooledThemesContextMenu();
        this.contextMenu.Hide();

        gameJamState.OnThemesGeneratedEvent.Subscribe( this.OnThemesGenerated );
        gameJamState.OnRoundEndedEvent.Subscribe( this.OnRoundEnded );
        gameJamState.OnThemeReplacedEvent.Subscribe( this.OnThemeReplaced );

        gameJamState.OnPooledThemeContextClosedEvent.Subscribe( this.OnContextMenuClosed );
    }

    private OnThemesGenerated = () =>
    {
        this.PopulateThemes( gameJamState.GeneratedThemes );
        this.UpdatePooledThemeButtons();

        this.Show();
    }

    public PopulateThemes( themeData: ReadonlyArray<ThemeDatum> )
    {
        const themeIds: number[] = new Array( themeData.length );
        for ( var idx: number = 0; idx < themeIds.length; ++idx )
        {
            const theme: ThemeDatum = themeData[idx];
            themeIds[idx] = theme.Id;
        }
        ArrayUtility.FisherYatesShuffle( themeIds );

        for ( var idx: number = 0; idx < themeIds.length; idx++ )
        {
            const randThemeId: number = themeIds[idx];
            this.pooledThemeButtons[randThemeId] = this.CreatePooledThemeButton();
        }
    }

    private CreatePooledThemeButton() : PooledThemeButton
    {
        const newThemeButton = new PooledThemeButton();

        newThemeButton.OnClickedEvent.Subscribe( this.OnPooledThemeClicked );
        newThemeButton.SetParent( this.layoutContainer );

        return newThemeButton;
    }

    private OnPooledThemeClicked = ( themeButton: PooledThemeButton ) =>
    {
        this.Hide();

        this.contextMenu.SetTheme( themeButton.Theme );
        this.contextMenu.Show();
    }

    public Hide()
    {
        this.layoutContainer.parentElement?.classList.add( "d-none");
    }

    private OnRoundEnded = ( endedRound: TourneyRound ) =>
    {
        for ( var idx: number = 0; idx < endedRound.LoserIds.length; ++idx )
        {
            const loserId: number = endedRound.LoserIds[idx];
            const loserButton: PooledThemeButton = this.pooledThemeButtons[loserId];

            loserButton.Disable();
            loserButton.MarkAsLoser();
        }

        const winnerId: number = endedRound.WinnerId;
        const winnerButton: PooledThemeButton = this.pooledThemeButtons[winnerId];

        winnerButton.Disable();
    }

    private UpdatePooledThemeButtons = () =>
    {
        for ( var idx: number = 0; idx < gameJamState.GeneratedThemes.length; ++idx )
        {
            const theme: ThemeDatum = gameJamState.GeneratedThemes[idx];

            const themeButton: PooledThemeButton = this.pooledThemeButtons[theme.Id];
            themeButton.SetTheme( theme );
        }
    }

    private OnThemeReplaced = ( oldTheme: ThemeDatum ) =>
    {
        const oldThemeButton: PooledThemeButton = this.pooledThemeButtons[oldTheme.Id];
        console.log( "Deleting pooled theme: " + oldThemeButton.Theme );
        delete this.pooledThemeButtons[oldTheme.Id];

        for ( var idx: number = 0; idx < gameJamState.GeneratedThemes.length; ++idx )
        {
            const theme: ThemeDatum = gameJamState.GeneratedThemes[idx];

            if ( !this.pooledThemeButtons[theme.Id] )
            {
                this.pooledThemeButtons[theme.Id] = oldThemeButton;
                oldThemeButton.SetTheme( theme );
                
                break;
            }
        }
    }

    private OnContextMenuClosed = () =>
    {
        this.Show();
    }

    public Show()
    {
        this.layoutContainer.parentElement?.classList.remove( "d-none" );
    }
}