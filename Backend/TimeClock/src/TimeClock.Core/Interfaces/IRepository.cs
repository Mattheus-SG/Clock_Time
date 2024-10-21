namespace TimeClock.Core.Interfaces
{
    public interface IRepository<T> where T : class
    {

        Task<IEnumerable<T>> GetAll();

        Task<T> GetByIdAsync(int id);

        Task<T> AddAsync(T entity);

        Task<T> UpdateAsync(T entity, int id);  

        Task<bool> DeleteAsync(T entity, int id);

        Task<bool> SaveChangesAsync();

    }
}
