
let isAtime = true;
 class TicTacToe {

	
	constructor(data){
		this.array =  [[],[],[]];
		this.clear(data);
		
	}
	
	clear(data) {
		if(!data){
			data = [[],[],[]];
		}else{
			data = data.split("\n").map(function(each){ return each.split("|")})
		}
		let rows = 3,cols = 3;
		for(let i=0;i<rows;i++) {
			for(let j=0;j<cols;j++) {
				if(!data[i][j] || data[i][j] === ' '){
					 this.array[i][j] = 0;
				}else if(data[i][j] === 'O'){
					this.array[i][j] = 1;
				}else if(data[i][j] === 'X'){
					this.array[i][j] = 2;
				}
			}
		}	
	}
	
	isAvailable(row,col) {
		if(this.array[row][col] == 0) {
			return true;
		}
		return false;
	}
	
	insert(row,col,val=1) {
		this.array[row][col] = val;
		return true;
	}
	
	play(val=2) {
		let playerVal = val==1?2:1	
		let matchSet = this.isMatched(playerVal);	
		if(matchSet) {
			return {text : "You Win",matchSet : matchSet,winner:playerVal };
		}
		if(this.isOver()) {
			return {text : "Tied",winner: 0 };
		}
		this.move(val);
		matchSet = this.isMatched(val);
		if(matchSet) {
			return {text : "bot Win",matchSet : matchSet,winner: val };
		}
		if(this.isOver()) {
			return {text : "Tied",winner: 0 };
		}
		
		return null;
	}
	
	
	move(val = 2) {
		if(this.makeIntelMove(false,val)) {
			return;
		}
		
		if(this.makeIntelMove(true,val)) {
			return;
		}
		
		this.randomMove(val);	
	}
	
	
	isMatched(val) {
		let row=3,col=3;
		for(let i=0;i<row;i++) {
			let isMatched = true; 
			for(let j=0;j<col;j++) {
				if(this.array[i][j]!=val) {
					isMatched = false;
					break;
				}
			}
			if(isMatched == true) {
				let v = i*3;
				return [v,v+1,v+2];
			}
		}	
		for(let i = 0;i<row;i++) {
			let isMatched = true;
			for(let j=0;j<col;j++) {
				if(this.array[j][i]!=val) {
					isMatched = false;
					break;
				}
			}
			if(isMatched == true) {
				let v = i;
				return [v,v+3,v+6];			
				}
		}
		
		
		let isMatched = true;
		for(let i = 0;i<row;i++) {
			if(this.array[i][i]!=val) {
				isMatched = false;
				break;
			}
		}
		if(isMatched == true) {
			return [0,4,8];			
		}
		
		isMatched = true;
		for(let i = 0;i<row;i++) {
			if(this.array[2-i][i]!=val) {
				isMatched = false;
				break;
			}
		}if(isMatched == true) {
			return [2,4,6];			
		}
		
		return false;
	}
	
	
	
	makeIntelMove(isIntelMove,val) {

		let row = 3, col = 3;
		let playerVal = val==1?2:1

		for (let i = 0; i < row; i++) {
	        let zeroCounter = 0;
	        let oCounter = 0;
	        let xCounter = 0;
	        let zeroIndex = -1;

	        for (let j = 0; j < col; j++) {
	            if (this.array[i][j] == 0) {
	                zeroCounter++;
	                zeroIndex = j;  
	            } else if (this.array[i][j] == playerVal) {
	                oCounter++;
	            } else if (this.array[i][j] == val) {
	                xCounter++;
	            }

	            
	        }
	        if (isIntelMove?(zeroCounter ==2 && xCounter ==1) :((oCounter == 2 || xCounter == 2) && zeroCounter == 1)) {
                    console.log("Row: " + i + ", Column: " + zeroIndex);
                    this.array[i][zeroIndex] = val;
                    return true;
                
            }
	    }
	 for (let j = 0; j < col; j++) {
	        let zeroCounter = 0;
	        let oCounter = 0;
	        let xCounter = 0;
	        let zeroIndex = -1;

	        for (let i = 0; i < row; i++) {
	            if (this.array[i][j] == 0) {
	                zeroCounter++;
	                zeroIndex = i;  
	            } else if (this.array[i][j] == playerVal) {
	                oCounter++;
	            } else if (this.array[i][j] == val) {
	                xCounter++;
	            }

	           
	        }
	        if (isIntelMove?(zeroCounter ==2 && xCounter ==1) :((oCounter == 2 || xCounter == 2) && zeroCounter == 1)) {
                    console.log("Row: " + zeroIndex + ", Column: " + j);
                    this.array[zeroIndex][j] = val;
                    return true;
          
            }
	    }
	 
	 let zeroCounter = 0;
        let oCounter = 0;
        let xCounter = 0;
        let zeroIndex = -1;
	 
        for(let i = 0;i<row;i++) {
			 if (this.array[i][i] == 0) {
	                zeroCounter++;
	                zeroIndex = i;  
	            } else if (this.array[i][i] == playerVal) {
	                oCounter++;
	            } else if (this.array[i][i] == val) {
	                xCounter++;
	            }
			}
		 
        if (isIntelMove?(zeroCounter ==2 && xCounter ==1) :((oCounter == 2 || xCounter == 2) && zeroCounter == 1)) {
                 console.log("Row: " + zeroIndex + ", Column: " + zeroIndex);
                 this.array[zeroIndex][zeroIndex] = val;
                 return true;
            
         }
		 
		 zeroCounter = 0;
	     oCounter = 0;
	     xCounter = 0;
	     zeroIndex = -1;
		 
		 for(let i = 0;i<row;i++) {
			 if (this.array[2-i][i] == 0) {
	                zeroCounter++;
	                zeroIndex = i;  
	            } else if (this.array[2-i][i] == playerVal) {
	                oCounter++;
	            } else if (this.array[2-i][i] == val) {
	                xCounter++;
	            }
			}
		 
	        if (isIntelMove?(zeroCounter ==2 && xCounter ==1) :((oCounter == 2 || xCounter == 2) && zeroCounter == 1)) {
                 console.log("Row: " + (2-zeroIndex) + ", Column: " + zeroIndex);
                 this.array[2-zeroIndex][zeroIndex] = val;
                 return true;
             
         }
		 
		 return false;
	}
	
	
	

	
	randomMove(val) {
		 let row = 3, col = 3;
		 let rowRand = Math.floor(Math.random()*10);
		 let colRand = Math.floor(Math.random()*10);

		 for (let i = 0; i < row; i++) {
			 let rowInd = (i+rowRand)%3;
		        for (let j = 0; j < col; j++) {
					 let colInd = (j+colRand)%3;

		        	 if (this.array[rowInd][colInd] == 0) {
		        		 console.log("Row: " + rowInd + ", Column: " + colInd);
		                    this.array[rowInd][colInd] = val;
		                    return;
		        	 }
		        }
		 }

	}
	 
	toString() {
		let res = "";

		for(let i=0;i<3;i++) {
			if(res){
				res+="\n"
			}
			for(let j=0;j<3;j++) {
				if(j!==0){
					res+="|";
				}
				if(this.array[i][j]==0) {
					res += (" ");
				}
				else if(this.array[i][j]==1) {
					res += ("O");
				}
				else {
					res += ("X");
				}
			}
		}
		return res;
	}
	
	
	
	
	isOver() {
		for(let i=0;i<3;i++) {
			for(let j=0;j<3;j++) {
				if(this.array[i][j]===0) {
					return false;
				}
			}
		}
		return true;
	}
	
	
	

}
