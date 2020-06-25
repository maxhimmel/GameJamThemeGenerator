import { ThemeDatum } from "../themeDatum";
import { gameJamState } from "../appState/gameJamState";
import { TourneyRound } from "../appState/tournament/tourneyRound";

export class VotingThemeButton
{
    private button: HTMLButtonElement;
    private theme: ThemeDatum = ThemeDatum.Empty;

    public constructor( button: HTMLButtonElement )
    {
        this.button = button;
        button.addEventListener( "click", this.OnClicked );
    }

    private OnClicked = ( event: MouseEvent ) =>
    {
        const currentRound: TourneyRound | undefined = gameJamState.GetCurrentRound();
        if ( currentRound )
        {
            gameJamState.SetWinner( currentRound.RoundId, this.theme );
        }
    }

    public SetTheme( theme: ThemeDatum )
    {
        this.theme = theme;
        this.button.innerText = theme.ThemeName;
    }
}