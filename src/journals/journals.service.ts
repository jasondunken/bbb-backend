import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { Journal, JournalDocument } from './schemas/journal.schema';
import { CreateJournalDto } from './dto/create-journal.dto';
import { JournalDto } from './dto/journal.dto';

@Injectable()
export class JournalsService {
  constructor(
    @InjectModel(Journal.name) private journalModel: Model<JournalDocument>,
  ) {}

  async create(createJournalDto: CreateJournalDto): Promise<Journal> {
    const createdJournal = await this.journalModel.create(createJournalDto);
    return createdJournal;
  }

  async getAll(): Promise<Journal[]> {
    return this.journalModel.find().lean().exec();
  }

  async findOne(id: String) {
    return this.journalModel.findOne({ _id: id }).exec();
  }

  //   async update(id: String, journalDto: JournalDto): Promise<Journal> {
  //     return this.journalModel.replaceOne({ _id: id }, journalDto);
  //   }

  async delete(id: String) {
    const deletedJournal = await this.journalModel.findByIdAndDelete({
      _id: id,
    });
    return deletedJournal;
  }
}
