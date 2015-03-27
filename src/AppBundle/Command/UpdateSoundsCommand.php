<?php

namespace AppBundle\Command;

use Symfony\Bundle\FrameworkBundle\Command\ContainerAwareCommand;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

class UpdateSoundsCommand extends ContainerAwareCommand
{
	protected function configure() {
		$this->setName('app:update-sounds')
			->setDescription('Updates the available sounds list reading base sounds.');
	}

	/**
	 * Entity manager
	 */
	protected $em = null;
	
	protected $baseSoundsData = null;
	
	protected function execute(InputInterface $input, OutputInterface $output) {
		$this->em = $this->getContainer()->get('doctrine')->getManager();
		$baseSoundsJson = realpath(__DIR__ . DIRECTORY_SEPARATOR
		    . ".." . DIRECTORY_SEPARATOR . ".." . DIRECTORY_SEPARATOR
			. ".." . DIRECTORY_SEPARATOR . "web" . DIRECTORY_SEPARATOR
			. "sound" . DIRECTORY_SEPARATOR . "sounds.json");
		$baseSoundsData = json_decode(file_get_contents($baseSoundsJson));
		if (empty($baseSoundsData)) {
			$output->writeln("Failed to parse " . $baseSoundsJson . " !");
			return 1;
		}
		$this->baseSoundsData = $baseSoundsData->sounds;
		$importedSoundsCount = 0;
		foreach ($this->baseSoundsData as $soundData) {
			// Check if a sound with the same label already exists in the DB
			$sound = $this->em->getRepository("AppBundle:Sound")
				->findOneByLabel($soundData->label);
			if (empty($sound)) {
				// Create new Sound in the DB
				$output->writeln("Importing " . $soundData->slug . " ...");
				$this->em->getRepository("AppBundle:Sound")
					->importBaseSound($soundData);
				$importedSoundsCount++;
			}
		}
		$output->writeln($importedSoundsCount . " sounds were imported. Success");
		return 0;
	}

}
