from typing import Optional
from fastapi import Request, FastAPI
import nltk
nltk.download('punkt')
import re
import numpy as np
from pydantic import BaseModel
import openai
from newspaper import Article

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Input_Text(BaseModel):
    text: str

class Input_Url(BaseModel):
    url: str

@app.post("/open_ai_summarise_url/")
def summarise_text(in_url: Input_Url):
    text = get_text_from_url(in_url.url)
    return {"summary_from_url" : openai_summary(text)}

@app.post("/open_ai_summarise_text/")
def summarise_text(in_text : Input_Text):
    return {"summary" : openai_summary(in_text.text)}

@app.post("/bow_summarise_url/")
def summarise_text(in_url: Input_Url):
    text = get_text_from_url(in_url.url)
    return {"summary_from_url" : nk_sir_summary(text)}

@app.post("/bow_summarise_text/")
def summarise_text(in_text : Input_Text):
    return {"summary" : nk_sir_summary(in_text.text)}

def casefolding(sentence):
    return sentence.lower()

def cleaning(sentence):
    return re.sub(r'[^a-z]', ' ', re.sub("’", '', sentence))

def tokenization(sentence):
    return sentence.split()
 
def sentence_split(paragraph):
    return nltk.sent_tokenize(paragraph)
    
def word_freq(data):
    w = []
    for sentence in data:
        for words in sentence:
            w.append(words)
    bag = list(set(w))
    res = {}
    for word in bag:
        res[word] = w.count(word)
    return res
    
def sentence_weight(data, wordfreq):
    weights = []
    for words in data:
        temp = 0
        for word in words:
            temp += wordfreq[word]
        weights.append(temp)
    return weights

def nk_sir_summary(text):
    sentence_list = sentence_split(text) #cutting into sentence form, each sent prepro
    data = []
    for sentence in sentence_list:
        data.append(tokenization(cleaning(casefolding(sentence))))

    data = (list(filter(None, data)))

    wordfreq = word_freq(data)#count each word

    rank = sentence_weight(data, wordfreq)#weight of each sentence

    n = 1 #no of main sentences to output; system takes top n sentences of highest weight
    result = ''
    sort_list = np.argsort(rank)[::-1][:n]
    for i in range(n):
        result += '{} '.format(sentence_list[sort_list[i]])

    return result

def openai_summary(paperContent):
    tldr_tag = "\n tl;dr:"
    openai.organization = 'org-9rbTVUqetC666xwjyOrBz0A6'
    openai.api_key = "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"
    engine_list = openai.Engine.list() 
    
    paperContent += tldr_tag
    
    response = openai.Completion.create(engine="davinci",prompt=paperContent,temperature=0.7,
        max_tokens=200,
        top_p=1.0,
        frequency_penalty=0.0,
        presence_penalty=0.0
    )

    return (response["choices"][0]["text"])

def get_text_from_url(url):
    """
    Parses the information in the given url and returns the text from it
    Parameters:
        url (string) : URL to an article
    Returns:
        string : Text from article
    """
    article = Article(url, language="en")
    article.download()
    article.parse()
    return article.text

# print(get_text_from_url("https://www.pib.gov.in/PressReleasePage.aspx?PRID=1805315"))
