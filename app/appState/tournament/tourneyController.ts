import { TourneyRound } from "./tourneyRound";

export class TourneyController
{
    public readonly ParticipantsPerRound: number = 2;

    public get TotalRounds() { return this.participantCount - 1; }

    private currentRound: number = 1;
    private participantCount: number = -1;
    private rounds: { [id: number]: TourneyRound } = {};

    public constructor( participantIds: number[] )
    {
        this.currentRound = 1;
        this.participantCount = participantIds.length;

        this.SetupFirstRounds( participantIds );
    }

    private SetupFirstRounds( participantIds: number[] )
    {
        const firstRoundsCount: number = participantIds.length / 2;
        for ( var rdx: number = 0; rdx < firstRoundsCount; ++rdx )
        {
            const roundOffset: number = rdx * this.ParticipantsPerRound;
            const newRound: TourneyRound = new TourneyRound( rdx + 1 );

            for ( var pdx: number = 0; pdx < this.ParticipantsPerRound; ++pdx )
            {
                const participantIndex = pdx + roundOffset;
                const id: number = participantIds[participantIndex];

                newRound.AddParticipant( id );
            }

            this.rounds[rdx + 1] = newRound;
        }
    }

    public GetRoundProgress(): number 
    {
        return ( this.currentRound - 1 ) / this.TotalRounds;
    }

    public GetCurrentRound(): TourneyRound | undefined
    {
        return this.GetRoundById( this.currentRound );
    }

    public SetWinner( roundId: number, winnerId: number )
    {
        const round: TourneyRound | undefined = this.GetRoundById( roundId );
        if ( !round )
        {
            console.error(
                "TourneyController | No rounds found at ID: " + roundId + ".\n" +
                "Total Rounds: " + this.TotalRounds + " | " +
                "Current Round: " + this.currentRound
            );
            return;
        }

        round.SetWinner( winnerId );

        const nextRound: TourneyRound = this.GetNextRound( roundId );
        nextRound.AddParticipant( winnerId );

        ++this.currentRound;
    }

    private GetNextRound( roundId: number ): TourneyRound
    {
        const nextRoundId = TourneyRound.GetNextRoundId( roundId, this.participantCount );
        var round: TourneyRound | undefined = this.GetRoundById( nextRoundId );

        if ( !round )
        {
            round = new TourneyRound( nextRoundId );
            this.rounds[nextRoundId] = round;
        }

        return round;
    }

    public GetRoundById( roundId: number ): TourneyRound | undefined
    {
        return this.rounds[roundId];
    }

    public ReplaceParticipant( oldId: number, newId: number )
    {
        const round: TourneyRound | undefined = this.GetRoundWithParticipant( oldId );
        if ( round )
        {
            round.ReplaceParticipant( oldId, newId );
        }
    }

    private GetRoundWithParticipant( participantId: number ): TourneyRound | undefined
    {
        for ( var rdx: number = 1; rdx <= this.TotalRounds; ++rdx )
        {
            const round: TourneyRound | undefined = this.GetRoundById( rdx );
            if ( round?.ContainsParticipant( participantId ) )
            {
                return round;
            }
        }

        console.error( "TourneyController | Cannot find round with participant ID '" + participantId + "'" );

        return undefined;
    }
}