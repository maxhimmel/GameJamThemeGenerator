import { VotingThemeButton } from "../votingWidgets/votingThemeButton";
import { ThemeDatum } from "../themeDatum";

export class VotingWidget
{
    private widgetContainer: HTMLDivElement;
    private leftButton: VotingThemeButton;
    private rightButton: VotingThemeButton;
    // private progressBar: ClassType = null;

    public constructor()
    {
        this.widgetContainer = <HTMLDivElement>document.getElementById( "votingContainer" );
        this.leftButton = new VotingThemeButton( <HTMLButtonElement>document.getElementById( "leftVotingTheme" ) );
        this.rightButton = new VotingThemeButton( <HTMLButtonElement>document.getElementById( "rightVotingTheme" ) );
    }

    public SetThemes( leftTheme: ThemeDatum, rightTheme: ThemeDatum )
    {
        this.leftButton.SetTheme( leftTheme );
        this.rightButton.SetTheme( rightTheme );
    }

    public Deactivate()
    {
        this.widgetContainer.classList.add( "overlay-disabled" );
    }

    public Activate()
    {
        this.widgetContainer.classList.remove( "overlay-disabled" );
    }
}