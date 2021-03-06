<?php

namespace AppBundle\Entity;

use Doctrine\ORM\EntityRepository;
use AppBundle\Entity\Sound;

/**
 * SoundRepository
 *
 * This class was generated by the Doctrine ORM. Add your own custom
 * repository methods below.
 */
class SoundRepository extends EntityRepository {
	
	public function findOneByLabel($label) {
		$qb = $this->getEntityManager()
			->createQueryBuilder("s");
		$q = $qb->select(array("s"))
			->from("AppBundle:Sound", "s")
			->where("s.label = :label")
			->setParameter("label", $label)
			->getQuery();
		$collection = $q->getResult();
		if (count($collection) === 0)
			return null;
		else
			return $collection[0];
	}
	
	public function importBaseSound($soundData) {
		$em = $this->getEntityManager();
		$s = new Sound();
		$s->setSlug($soundData->slug);
		$s->setLabel($soundData->label);
		$s->setIsPublic(true);
		$s->setIsDefault(true);
		$em->persist($s);
		$em->flush();
	}
	
	public function findAvailableToUserAsArray($user) {
		$qb = $this->getEntityManager()
			->createQueryBuilder("s");
		$q = $qb->select("s")
			->from("AppBundle:Sound", "s")
			->where("s.isPublic > 0 OR s.isDefault > 0 OR s.user = :u")
			->setParameter("u", $user)
			->getQuery();
		$sounds = $q->getResult();
		$res = array();
		foreach ($sounds as $s)
			$res []= $s->toSimpleArray();
		return $res;
	}
	
}
