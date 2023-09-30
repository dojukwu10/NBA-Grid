#FIND A WAY TO ACCOUNT FOR PLAYERS WITH SAME URL NAMES (KEEP COUNT OF TIMES A URL POPS UP IN AN ARRAY. ADD 1 TO 01 IN URL)
#ACCOUNT FOR COMMAS AND PERIODS IN PLAYERS WITH JR OR NUMBERS IN THEIR NAMES

from bs4 import BeautifulSoup
import requests
import time
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

uri = "mongodb+srv://ojukwuderek:ugatp2003@all-nba-players.ppyocuh.mongodb.net/?retryWrites=true&w=majority"

client = MongoClient(uri, server_api=ServerApi('1'))

try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)


db = client["all-nba-players"]
collection = db["version2"]


class Player:
     def __init__(self, name, teams, years):
        self.name = name 
        self.teams = teams
        self.years = years
     
#keep track of player names
player_names = []
#keep track of teams (can be deleted) 
player_teams = []
#keep track of the player bojects to be pushed to mongo
player_objects = []
#keep track of player url occurences to make sure we get players with same url in bball ref
player_url = []



for x in range(1947, 2024):

    url = 'https://basketball.realgm.com/nba/players/'+str(x)
    response = requests.get(url)

    soup = BeautifulSoup(response.text, 'html.parser')




    td_elements = soup.find_all('td')

    player_td_elements = [td for td in td_elements if td.get('data-th') == 'Player']

        # Loop through <td> elements and extract the player names
    for td in player_td_elements:
            # Find the <a> tag within the <td> element
            player_link = td.find('a')
            
            # Check if a link is found and if it has a data-th attribute
            if player_link:
                
                # Extract the player's name
                
                scrub_name = player_link.text.replace('-', '')
                player_name = scrub_name.replace('.', '')
                
                
                space = player_name.find(' ')
                last_initial = player_name[space + 1]+'/'
                last_name_first_five = (player_name[space+1:])[:5]
                first_name_first_two = player_name[:2]
                url_var = last_initial.lower() + last_name_first_five.lower()  + first_name_first_two.lower()+'01.html' 

                bball_ref_url = 'https://www.basketball-reference.com/players/' + url_var
                

                

                if url_var in player_url:
                    if player_name not in player_names:
                        print("ALERT: " +url_var)
                        print(player_name)
                        num = player_url.count(url_var) + 1
                        url_var2 = last_initial.lower() + last_name_first_five.lower()  + first_name_first_two.lower()+"0"+str(num)+'.html' 
                        response2 = requests.get('https://www.basketball-reference.com/players/'+url_var2)
                        soup2 = BeautifulSoup(response2.text, 'html.parser')
                        time.sleep(5)
                        #print(f'Request was rejected with status code {response2.status_code}')
                        td_elements = soup2.find_all('td')
                        th_elements = soup2.find_all('th')
                        team_td_elements = [td for td in td_elements if td.get('data-stat') == 'team_id']
                        season_th_elements = [th for th in th_elements if th.get('data-stat') == 'season']
                        p = Player(player_name, [], [])                    
                        for td in team_td_elements:
                            team_link = td.find('a')
                            if team_link:
                                if team_link.text not in p.teams:
                                    team_name = team_link.text
                                    p.teams.append(team_name)
                                    player_teams.append(team_name)
                       
                        year2 = None
                        year = None
                        for i, th in enumerate(season_th_elements):
                            season_link = th.find('a')
                            if season_link: 
                                year = season_link.text
                                if year in p.years:
                                    i = i
                                else:        
                                    #if i == 1:
                                  
                                    p.years.append(year)
                            year2 = year
    
                                        
                        if len(p.years) > 0:
                            p.years = [p.years[0], p.years[-1]]


                                
                        print(f"{p.teams}")
                        print(f"{p.years}")

                        player_objects.append(p)
                        player_url.append(url_var)
                        p2 = collection.insert_one(vars(p))
                        player_names.append(player_name)
                        print("Inserted player ID:", p2.inserted_id)






                else:
                    if player_name not in player_names:
                        player_url.append(url_var)
                        print(player_name)
                        print(url_var)
                        response2 = requests.get(bball_ref_url)
                        soup2 = BeautifulSoup(response2.text, 'html.parser')
                        time.sleep(5)
                        #print(f'Request was rejected with status code {response2.status_code}')
                        td_elements = soup2.find_all('td')
                        th_elements = soup2.find_all('th')
                        team_td_elements = [td for td in td_elements if td.get('data-stat') == 'team_id']
                        season_th_elements = [th for th in th_elements if th.get('data-stat') == 'season']
                        p = Player(player_name, [], [])
                        for td in team_td_elements:
                            team_link = td.find('a')
                            if team_link:
                                if team_link.text not in p.teams:
                                    team_name = team_link.text
                                    p.teams.append(team_name)
                                    player_teams.append(team_name)
                        year2 = None
                        year = None
                        for i, th in enumerate(season_th_elements):
                            season_link = th.find('a')
                            if season_link: 
                                year = season_link.text
                                if year in p.years:
                                    i = i
                                else:        
                                    #if i == 1:
                                  
                                    p.years.append(year)
                            year2 = year
    
                                        
                        if len(p.years) > 0:
                            p.years = [p.years[0], p.years[-1]]


                        print(f"{p.teams}")
                        print(f"{p.years}")


                        player_objects.append(p)
                        player_url.append(url_var)
                        p2 = collection.insert_one(vars(p))
                        player_names.append(player_name)
                        print("Inserted player ID:", p2.inserted_id)



                    
                






    










