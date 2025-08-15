from openai import OpenAI
import os

# Set your OpenAI API key here
client = OpenAI(api_key="YOUR_API_KEY_HERE")  # Replace with your actual API key

def chat_with_openai(message, model="gpt-4-1106-preview"):
    """
    Send a message to OpenAI and get a response
    
    Args:
        message (str): The user's input message
        model (str): The OpenAI model to use (using GPT-4 Turbo which is closest to gpt4.1mini)
    
    Returns:
        str: The AI's response
    """
    try:
        response = client.chat.completions.create(
            model=model,
            messages=[
                {"role": "user", "content": message}
            ],
            max_tokens=150,
            temperature=0.7
        )
        
        return response.choices[0].message.content.strip()
    
    except Exception as e:
        return f"Error: {str(e)}"

def main():
    """
    Main function to run the chat interface
    """
    print("OpenAI Chat Bot")
    print("Type 'quit' to exit")
    print("-" * 30)
    
    while True:
        # Get user input
        user_input = input("\nYou: ")
        
        # Check if user wants to quit
        if user_input.lower() == 'quit':
            print("Goodbye!")
            break
        
        # Get AI response
        ai_response = chat_with_openai(user_input)
        
        # Display response
        print(f"AI: {ai_response}")

if __name__ == "__main__":
    main()