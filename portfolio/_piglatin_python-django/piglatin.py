def translate(word):
	'''
	Translates a word into Pig Latin.

	Args:
	word (str): The word to be translated.

	Returns:
	str: The word translated into Pig Latin according to the rules.
	'''
	vowels = 'aeiou'
	word = word.lower()
	extension = 'ay'

	# Word starting with a vowel
	if word[0] in vowels:
		return word + extension
	
	# Word starting with "xr" or "yt"
	if word[:2] == 'xr' or word[:2] == 'yt':
		return word + extension

	# Word starting with a consonant followed by "qu"
	if word[0] not in vowels and word[1:3] == 'qu':
		return word[3:] + word[:3] + extension

	# Word starting with a cluster of consonants
	for i in range(len(word)):
		if word[i] in vowels:
			return word[i:] + word[:i] + extension

	# Word starting with consonant cluster followed by a "y"
	# Two letter word where "y" is the second letter 
	for i in range (1, len(word)):
		if word[i] == 'y' and word[i-1] not in vowels:
			return word[i:] + word[:i] + extension

	# Word starting with consonant followed by vowel
	if word[0] not in vowels:
		return word[1:] + word[0] + extension

def prompt():
	'''
	Asks the user to type a word and translates this word into Pig Latin.
	'''
	w = input("Type a word: ")
	print(f"Pig Latin: {translate(w)}.")

if __name__ == "__main__":
	prompt()
