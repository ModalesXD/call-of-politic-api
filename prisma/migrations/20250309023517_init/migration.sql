-- AlterTable
CREATE SEQUENCE season_season_seq;
ALTER TABLE "Season" ALTER COLUMN "season" SET DEFAULT nextval('season_season_seq');
ALTER SEQUENCE season_season_seq OWNED BY "Season"."season";
