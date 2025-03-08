import { Controller, Get, Post, Put, Delete, Body, Param, Query, NotFoundException, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateElectionsDto, UpdateElectionsDto } from '../dto/election.dto';
import { Elections } from '@prisma/client';
import { AppService } from 'src/app.service';

@ApiTags('Elections')
@Controller('elections')
export class ElectionsController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Get all elections' })
  @ApiResponse({ status: 200, description: 'Return all elections.' })
  async findAll(
    @Query('countryId') countryId?: string,
    @Query('status') status?: string,
  ): Promise<Elections[]> {
    try { const where: any = {};
      if (countryId) where.countryId = countryId;
      if (status) where.status = status;

      return await this.appService.findAll<Elections>('elections', { where });
    } catch (error) {
      throw new InternalServerErrorException('Failed to get elections');
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an election by id' })
  @ApiResponse({ status: 200, description: 'Return an election.' })
  async findOne(@Param('id') id: string): Promise<Elections> {
    try {
      const election = await this.appService.findOne<Elections>('elections', id);
      if (!election) {
        throw new NotFoundException(`Election with ID ${id} not found`);
      }
      return election;
    } catch (error) {
      throw new InternalServerErrorException('Failed to get election');
    }
  }

  @Post()
  @ApiOperation({ summary: 'Create a new election' })
  @ApiResponse({ status: 201, description: 'The election has been created.' })
  async create(@Body() createElectionDto: CreateElectionsDto): Promise<Elections> {
    try {
      return await this.appService.create<Elections>('elections', createElectionDto);
    } catch (error) {
      throw new InternalServerErrorException('Failed to create election');
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an election' })
  @ApiResponse({ status: 200, description: 'The election has been updated.' })
  async update(@Param('id') id: string, @Body() updateElectionDto: UpdateElectionsDto): Promise<Elections> {
    try {
      const election = await this.appService.update<Elections>('elections', id, updateElectionDto);
      if (!election) {
        throw new NotFoundException(`Election with ID ${id} not found`);
      }
      return election;
    } catch (error) {
      throw new InternalServerErrorException('Failed to update election');
    }
  }

  @Put(':id/start')
  @ApiOperation({ summary: 'Start an election' })
  @ApiResponse({ status: 200, description: 'The election has been started.' })
  async startElection(@Param('id') id: string): Promise<Elections> {
    try {
      const election = await this.appService.update<Elections>('elections', id, { status: 'STARTED' });
      if (!election) {
        throw new NotFoundException(`Election with ID ${id} not found`);
      }
      return election;
    } catch (error) {
      throw new InternalServerErrorException('Failed to start election');
    }
  }

  @Put(':id/end')
  @ApiOperation({ summary: 'End an election' })
  @ApiResponse({ status: 200, description: 'The election has been ended.' })
  async endElection(@Param('id') id: string): Promise<Elections> {
    try {
      const election = await this.appService.update<Elections>('elections', id, { status: 'ENDED' });
      if (!election) {
        throw new NotFoundException(`Election with ID ${id} not found`);
      }
      return election;
    } catch (error) {
      throw new InternalServerErrorException('Failed to end election');
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an election' })
  @ApiResponse({ status: 200, description: 'The election has been deleted.' })
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    try {
      await this.appService.delete<Elections>('elections', id);
      return { message: `Election ${id} deleted successfully` };
    } catch (error) {
      throw new NotFoundException(`Failed to delete election with ID ${id}`);
    }
  }
}
