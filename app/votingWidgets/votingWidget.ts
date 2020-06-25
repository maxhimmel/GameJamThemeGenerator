import { VotingThemeButton } from "../votingWidgets/votingThemeButton";
import { ThemeDatum } from "../themeDatum";
import { gameJamState } from "../appState/gameJamState";
import { TourneyRound } from "../appState/tournament/tourneyRound";

export class VotingWidget
{
    private widgetContainer: HTMLDivElement;
    private progressBar: HTMLDivElement;
    private votingButtons: VotingThemeButton[] = [];

    public constructor()
    {
        this.widgetContainer = document.getElementById( "votingContainer" ) as HTMLDivElement;
        this.progressBar = document.getElementById( "votingProgress" ) as HTMLDivElement;

        const votingButtonElements: HTMLCollectionOf<HTMLButtonElement> = this.widgetContainer.getElementsByTagName( "button" );
        for ( var idx: number = 0; idx < votingButtonElements.length; ++idx )
        {
            const rawElement: HTMLButtonElement = votingButtonElements[idx];
            this.votingButtons.push( new VotingThemeButton( rawElement ) );
        }

        gameJamState.OnThemesGeneratedEvent.Subscribe( this.OnThemesGenerated );
        gameJamState.OnRoundEndedEvent.Subscribe( this.UpdateThemes );
        gameJamState.OnThemeReplacedEvent.Subscribe( this.UpdateThemes );
        gameJamState.OnWinnerDeclaredEvent.Subscribe( this.OnWinnerDeclared );

        gameJamState.OnPooledThemeContextOpenedEvent.Subscribe( this.Deactivate );
        gameJamState.OnPooledThemeContextClosedEvent.Subscribe( this.Activate );
    }

    private OnThemesGenerated = () =>
    {
        this.UpdateThemes();

        this.Show();
    }

    private UpdateThemes = () =>
    {
        const currentRound: TourneyRound | undefined = gameJamState.GetCurrentRound();
        if ( !currentRound ) { return; }

        for ( var idx: number = 0; idx < currentRound.ParticipantIds.length; ++idx )
        {
            const participantId: number = currentRound.ParticipantIds[idx];
            const votingButton: VotingThemeButton = this.votingButtons[idx];

            const theme: ThemeDatum = gameJamState.GetThemeById( participantId );
            votingButton.SetTheme( theme );
        }

        this.UpdateProgressBar();
    }

    private UpdateProgressBar()
    {
        const roundProgress: number = gameJamState.GetRoundProgress() * 100;

        this.progressBar.setAttribute( "aria-valuenow", roundProgress.toString() );
        this.progressBar.style.width = roundProgress.toString() + "%";
    }

    private OnWinnerDeclared = () =>
    {
        this.Hide();
    }

    private Deactivate = () =>
    {
        this.widgetContainer.classList.add( "overlay-disabled" );
    }

    private Activate = () =>
    {
        this.widgetContainer.classList.remove( "overlay-disabled" );
    }

    public Hide()
    {
        this.widgetContainer.classList.add( "d-none" );
    }

    public Show()
    {
        this.widgetContainer.classList.remove( "d-none" );
    }
}