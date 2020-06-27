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

        this.AttachFingerAnims();
    }

    private OnClicked = ( event: MouseEvent ) =>
    {
        const currentRound: TourneyRound | undefined = gameJamState.GetCurrentRound();
        if ( currentRound )
        {
            gameJamState.SetWinner( currentRound.RoundId, this.theme );
        }
    }

    private AttachFingerAnims()
    {
        const parent: HTMLElement | null = this.button.parentElement;
        if ( !parent ) { return; }

        const nextSibling: Element | null = parent.nextElementSibling;
        const prevSibling: Element | null = parent.previousElementSibling;

        const fingerAnimElement: Element | null = nextSibling ?? prevSibling;
        if ( fingerAnimElement )
        {
            const animClass: string = prevSibling ? "finger-bounce-left" : "finger-bounce-right";

            this.button.addEventListener( "mouseenter", () =>
            {
                fingerAnimElement.classList.add( animClass );
            } );
            this.button.addEventListener( "mouseleave", () =>
            {
                fingerAnimElement.classList.remove( animClass );
            } );
        }
    }

    public SetTheme( theme: ThemeDatum )
    {
        this.theme = theme;
        this.button.innerText = theme.ThemeName;
    }
}