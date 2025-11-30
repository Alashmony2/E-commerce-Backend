import { FilterQuery, Model, ProjectionType, QueryOptions, RootFilterQuery, UpdateQuery } from 'mongoose';

export class AbstractRepository<T> {
  constructor(private readonly model: Model<T>) {}
  public async create(item: Partial<T>) {
    const doc = new this.model(item);
    return doc.save();
  }
  public async getOne(
    filter: RootFilterQuery<T>,
    projection?: ProjectionType<T>,
    options?: QueryOptions,
  ) {
    return this.model.findOne(filter, projection, options);
  }
  public async getAll(
    filter: FilterQuery<T>,
    projection?: ProjectionType<T>,
    options?: QueryOptions,
    query?:any
  ) {
    return this.model.find(filter, projection, options);
  }
  public async update(
    filter: RootFilterQuery<T>,
    update?: UpdateQuery<T>,
    options?: QueryOptions
  ) {
    return await this.model.findOneAndUpdate(filter, update, options);
  }
}
