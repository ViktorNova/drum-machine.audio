<?php

namespace AppBundle\Entity;

use Doctrine\ORM\EntityRepository;

/**
 * PatternRepository
 *
 * This class was generated by the Doctrine ORM. Add your own custom
 * repository methods below.
 */
class PatternRepository extends EntityRepository {

	public function findAvailableToUser($user) {
		$res = array();
		$qb = $this->getEntityManager()
			->createQueryBuilder("p")
			->select(array("p"))
			->from("AppBundle:Pattern", "p")
			->where("p.isPublic > 0 OR p.isDefault > 0 OR p.user = :u")
			->setParameter("u", $user)
			->orderBy("p.label", "ASC")
			->getQuery();
		$patterns = $qb->getResult();
		foreach ($patterns as $p)
			$res []= $p->toSimpleArray();
		return $res;
	}

}