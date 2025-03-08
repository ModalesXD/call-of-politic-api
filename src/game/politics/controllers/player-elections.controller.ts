import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AppService } from 'src/app.service';
import { CreatePlayerElectionDto, UpdatePlayerElectionDto } from '../dto/player-election.dto';


@ApiTags('Player Elections')
@Controller('player-elections')
export class PlayerElectionsController {
  constructor(private readonly database: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Get all player elections' })
  @ApiResponse({ status: 200, description: 'Return all player elections.' })
  async findAll(
    @Query('electionId') electionId?: string,
    @Query('playerId') playerId?: string,
  ) {
    return this.database.findAll('playerElections', playerId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a player election by id' })
  @ApiResponse({ status: 200, description: 'Return a player election.' })
  async findOne(@Param('id') id: string) {
    return this.database.findOne('playerElections',id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new player election' })
  @ApiResponse({ status: 201, description: 'The player election has been created.' })
  async create(@Body() createPlayerElectionDto: CreatePlayerElectionDto) {
    return this.database.create('playerElections',createPlayerElectionDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a player election' })
  @ApiResponse({ status: 200, description: 'The player election has been updated.' })
  async update(
    @Param('id') id: string,
    @Body() updatePlayerElectionDto: UpdatePlayerElectionDto,
  ) {
    return this.database.update('playerElections', id, updatePlayerElectionDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a player election' })
  @ApiResponse({ status: 200, description: 'The player election has been deleted.' })
  async remove(@Param('id') id: string) {
    return this.database.delete('playerElections',id);
  }

  @Get(':id/campaign-stats')
  @ApiOperation({ summary: 'Get campaign statistics' })
  @ApiResponse({ status: 200, description: 'Return campaign statistics.' })
  async getCampaignStats(@Param('id') id: string) {
    return this.database.findOne('playerElections', id);
  }
}
