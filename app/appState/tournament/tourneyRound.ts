import { Random } from "../../utility/random";
import { ArrayUtility } from "../../utility/arrayUtility";

export class TourneyRound
{
    public readonly RoundId: number = -1;

    public get WinnerId(): number { return this.winnerId; }
    public get ParticipantIds(): ReadonlyArray<number> { return this.participantIds; }
    public get LoserIds(): ReadonlyArray<number> { return this.loserIds; }

    private participantIds: number[] = [];
    private winnerId: number = -1;
    private loserIds: number[] = [];

    public constructor( roundNumber: number )
    {
        this.RoundId = roundNumber;
    }

    public AddParticipant( participantId: number )
    {
        this.participantIds.push( participantId );
    }

    public SetWinner( winnerId: number )
    {
        this.winnerId = winnerId;

        this.participantIds.forEach( pdx =>
        {
            if ( pdx != winnerId )
            {
                this.loserIds.push( pdx );
            }
        } );
    }

    public ReplaceParticipant( oldId: number, newId: number )
    {
        if ( !this.ContainsParticipant( oldId ) ) { return; }

        if ( this.participantIds.length > 0 )
        {
            ArrayUtility.Remove( this.participantIds, oldId );
            this.participantIds.push( newId );
        }

        if ( this.winnerId == oldId )
        {
            this.winnerId = newId;
        }

        if ( this.loserIds.length > 0 )
        {
            ArrayUtility.Remove( this.loserIds, oldId );
            this.loserIds.push( newId );
        }
    }

    public ContainsParticipant( participantId: number ): boolean
    {
        if ( this.participantIds.length <= 0 ) { return false; }

        for ( var pdx: number = 0; pdx < this.participantIds.length; ++pdx )
        {
            const id: number = this.participantIds[pdx];
            if ( id == participantId ) { return true; }
        }

        return false;
    }

    public GetNextRoundId( participantCount: number ): number
    {
        return TourneyRound.GetNextRoundId( this.RoundId, participantCount );
    }

    public static GetNextRoundId( roundId: number, participantCount: number ): number
    {
        const firstRoundsCount: number = participantCount / 2;
        const nextRoundId: number = firstRoundsCount + Math.ceil( roundId / 2 );

        return nextRoundId;
    }
}