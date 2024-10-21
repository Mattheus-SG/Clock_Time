using Microsoft.EntityFrameworkCore;

using TimeClock.Core.Interfaces;
using TimeClock.Data.Context;

namespace TimeClock.Data.Repository
{
    public class Repository<TEntity> : IRepository<TEntity> where TEntity : class
    {

        protected readonly DataContext _context;
        protected readonly DbSet<TEntity> DbSet;

        public Repository(DataContext context)
        {
            this._context = context;
            DbSet = context.Set<TEntity>();
        }

        public async Task<TEntity> AddAsync(TEntity entity)
        {
            this.DbSet.Add(entity);
            await this._context.SaveChangesAsync();
            return entity;
        }

        public async Task<TEntity> UpdateAsync(TEntity entity, int id)
        {
            this.DbSet.Update(entity);
            await this._context.SaveChangesAsync();
            await this.DbSet.FindAsync(id);
            return entity;
        }

        public async Task<bool> DeleteAsync(TEntity entity, int id)
        {
            var model = await DbSet.FindAsync(id);
            DbSet.Remove(model);
            var success = await _context.SaveChangesAsync();

            if (success >= 0) 
                return true;
            return false;
        }

        public async Task<IEnumerable<TEntity>> GetAll()
        {
            return await this.DbSet.AsNoTracking().ToListAsync();
        }

        public async Task<TEntity> GetByIdAsync(int id)
        {
            return await this.DbSet.FindAsync(id);
        }

        public async Task<bool> SaveChangesAsync()
        {
            var success = await this._context.SaveChangesAsync();
            if (success >= 0) return true;
            return false;
        }
    }
}
