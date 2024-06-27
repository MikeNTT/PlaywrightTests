const authentication = `key=bfe86b4db94e7b40d0395ca3ab7ead84&token=ATTA8bf06bea926c1f1fdfcc792dffcc5633170879fa5b8293304d2971a862ab5fa5FEFE83A5`;

export class TrelloApi {
    // BOARD APIS
    createNewBoard(name: string) { return `https://api.trello.com/1/boards/?name=${name}&${authentication}`; }
    getABoard(boardId: string) { return `https://api.trello.com/1/boards/${boardId}?${authentication}`; }
    updateBoard(boardId: string, newBoardName: string) { return `https://api.trello.com/1/boards/${boardId}?${authentication}&name=${newBoardName}`; }
    deleteBoard(boardId: string) { return `https://api.trello.com/1/boards/${boardId}?${authentication}`; }

    // LIST APIS
    createNewList(boardId: string, listName: string) { return `https://api.trello.com/1/boards/${boardId}/lists?name=${listName}&${authentication}`; }
    updateList(listId: string, newListName: string) { return `https://api.trello.com/1/lists/${listId}?${authentication}&name=${newListName}`; }
    archiveAList(listId: string) { return `https://api.trello.com/1/lists/${listId}?${authentication}&closed=false`; }
    
    // CARD APIS
    createNewCard(listId: string, cardName: string) { return `https://api.trello.com/1/cards?idList=${listId}&name=${cardName}&${authentication}`; }
    deleteCard(cardId: string) { return `https://api.trello.com/1/cards/${cardId}?${authentication}`; }

    //Create a Label
    createNewLabel(labelName: string, color: string, boardId: string) { return `https://api.trello.com/1/labels?name=${labelName}&color=${color}&idBoard=${boardId}&${authentication}`; }
}