namespace AngularApp.Models
{
    public interface IMessageProvider
    {
        string GetMessage();
    }

    public class MessageProvider : IMessageProvider
    {
        public string GetMessage()
        {
            return "Message from " + GetType();
        }
    }
}