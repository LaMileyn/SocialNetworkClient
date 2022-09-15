import {IUser} from "../../models";

export const getTypingPeopleText = (typingPeople : IUser[]) : string =>{
    return typingPeople.length === 1
        ? `${typingPeople[0].username} печатает`
        : `${typingPeople[0].username} и еще ${typingPeople.length - 1} печатают...`
}