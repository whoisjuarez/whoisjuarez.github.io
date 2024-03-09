import unittest
import piglatin

class TestPigLatin(unittest.TestCase):
	# Test Vowels
	def test_vowel_a(self):
		self.assertEqual(piglatin.translate("asteroid"), "asteroiday")

	def test_vowel_e(self):
		self.assertEqual(piglatin.translate("eat"), "eatay")
	
	def test_vowel_i(self):
		self.assertEqual(piglatin.translate("intestine"), "intestineay")

	def test_vowel_o(self):
		self.assertEqual(piglatin.translate("omelet"), "omeletay")

	def test_vowel_u(self):
		self.assertEqual(piglatin.translate("underwear"), "underwearay")

	# Test Not In Vowels
	def test_consonant(self):
		self.assertEqual(piglatin.translate("pig"), "igpay")

	def test_consonant_xr_yt(self):
		self.assertEqual(piglatin.translate("xray"), "xrayay")
		self.assertEqual(piglatin.translate("yttria"), "yttriaay")

	def test_consonant_ch_st(self):
		self.assertEqual(piglatin.translate("chair"), "airchay")
		self.assertEqual(piglatin.translate("stand"), "andstay")
	
	def test_consonant_qu(self):
		self.assertEqual(piglatin.translate("square"), "aresquay")
	
	def test_consonant_y(self):
		self.assertEqual(piglatin.translate("spry"), "yspray")
		self.assertEqual(piglatin.translate("rhythm"), "ythmrhay")
		self.assertEqual(piglatin.translate("my"), "ymay")

