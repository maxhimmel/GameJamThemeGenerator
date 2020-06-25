export class ThemeDatum
{
    public static readonly Empty: ThemeDatum = new ThemeDatum( -1, "Empty" );

    public readonly Id: number = -1;
    public readonly ThemeName: string = "Theme";

    public constructor( id: number, themeName: string )
    {
        this.Id = id;
        this.ThemeName = themeName;
    }

    public toString(): string
    {
        return "ThemeDatum (" + this.Id + " | " + this.ThemeName + ")";
    }
}