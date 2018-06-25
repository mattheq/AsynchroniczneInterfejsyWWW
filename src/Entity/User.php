<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use Gedmo\Mapping\Annotation as Gedmo;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Security\Core\User\UserInterface;

/**
 * @ORM\Entity(repositoryClass="App\Repository\UserRepository")
 * @ORM\Table(name="user")
 * @UniqueEntity("email", message="This email is already used.")
 * @ApiResource(
 *     collectionOperations={"get"},
 *     itemOperations={"get"},
 *     attributes={
 *          "normalization_context"={"groups"={"user"}}
 *     }
 * )
 */
class User implements UserInterface, \Serializable
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"item", "user", "message"})
     */
    private $id;

    /**
     * @var string
     * @ORM\Column(type="string", length=255)
     * @Assert\NotBlank()
     * @Groups({"item", "user", "message"})
     */
    private $firstname;

    /**
     * @var string
     * @ORM\Column(type="string", length=255)
     * @Assert\NotBlank()
     * @Groups({"item", "user", "message"})
     */
    private $lastname;

    /**
     * @var string
     * @ORM\Column(type="string", length=255, unique=true)
     * @Assert\NotBlank()
     * @Assert\Email()
     * @Groups({"item", "user", "message"})
     */
    private $email;

    /**
     * @var string
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"item", "user", "message"})
     */
    private $phone_number;

    /**
     * @var string
     * @ORM\Column(type="string", length=255)
     * @Assert\NotBlank()
     */
    private $password;

    /**
     * @var string
     * @ORM\Column(type="string", length=255)
     */
    private $auth_key;

    /**
     * @var integer
     * @ORM\Column(type="integer")
     * @Gedmo\Timestampable(on="create")
     */
    private $created_at;

    /**
     * @var integer
     * @ORM\Column(type="integer")
     * @Gedmo\Timestampable(on="update")
     */
    private $updated_at;

    /**
     * @var string
     * @Assert\NotBlank()
     * @Assert\EqualTo(propertyPath="password", message="The password fields must match")
     */
    private $password_repeat;

    /**
     * @var Item[]
     * @ORM\OneToMany(targetEntity="Item", mappedBy="user")
     */
    private $items;

    /**
     * @var Message[]
     * @ORM\OneToMany(targetEntity="Message", mappedBy="to")
     */
    private $messages_to;

    /**
     * @var Message[]
     * @ORM\OneToMany(targetEntity="Message", mappedBy="from")
     */
    private $messages_from;

    /**
     * User constructor.
     * @throws \Exception
     */
    public function __construct()
    {
        $this->setAuthKey(base64_encode(random_bytes(32)));
        $this->items = new ArrayCollection();
        $this->messages_to = new ArrayCollection();
        $this->messages_from = new ArrayCollection();
    }

    /**
     * @return mixed
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @return int
     */
    public function getCreatedAt(): int
    {
        return $this->created_at;
    }

    /**
     * @return int
     */
    public function getUpdatedAt(): int
    {
        return $this->updated_at;
    }

    /**
     * @return string
     */
    public function getFirstname(): ?string
    {
        return $this->firstname;
    }

    /**
     * @param string $firstname
     */
    public function setFirstname(string $firstname): void
    {
        $this->firstname = $firstname;
    }

    /**
     * @return string
     */
    public function getLastname(): ?string
    {
        return $this->lastname;
    }

    /**
     * @param string $lastname
     */
    public function setLastname(string $lastname): void
    {
        $this->lastname = $lastname;
    }

    /**
     * @return string
     */
    public function getEmail(): ?string
    {
        return $this->email;
    }

    /**
     * @param string $email
     */
    public function setEmail(string $email): void
    {
        $this->email = $email;
    }

    /**
     * @param string $password
     */
    public function setPassword(string $password): void
    {
        $this->password = $password;
    }

    /**
     * @return string
     */
    public function getPhoneNumber(): ?string
    {
        return $this->phone_number;
    }

    public function getPhone_number()
    {
        return $this->phone_number;
    }

    /**
     * @param string $phone_number
     */
    public function setPhoneNumber(string $phone_number): void
    {
        $this->phone_number = $phone_number;
    }

    /**
     * @return string
     */
    public function getAuthKey(): ?string
    {
        return $this->auth_key;
    }

    /**
     * @param string $auth_key
     */
    public function setAuthKey(string $auth_key): void
    {
        $this->auth_key = $auth_key;
    }

    /**
     * @return string
     */
    public function getPasswordRepeat(): ?string
    {
        return $this->password_repeat;
    }

    /**
     * @param string $password_repeat
     */
    public function setPasswordRepeat(string $password_repeat): void
    {
        $this->password_repeat = $password_repeat;
    }

    /**
     * @inheritdoc
     */
    public function serialize()
    {
        return serialize(array(
            $this->id,
            $this->email,
            $this->password
        ));
    }

    /**
     * @inheritdoc
     */
    public function unserialize($serialized)
    {
        list (
            $this->id,
            $this->email,
            $this->password
            ) = unserialize($serialized);
    }

    /**
     * @inheritdoc
     */
    public function getRoles()
    {
        return array('ROLE_USER');
    }

    /**
     * @inheritdoc
     */
    public function getPassword()
    {
        return $this->password;
    }

    /**
     * @inheritdoc
     */
    public function getSalt()
    {
        return null;
    }

    /**
     * @inheritdoc
     */
    public function getUsername()
    {
        return $this->email;
    }

    /**
     * @inheritdoc
     */
    public function eraseCredentials()
    {

    }

    /**
     * @return Item[]
     */
    public function getItems()
    {
        return $this->items;
    }

    /**
     * @param Item[] $items
     */
    public function setItems(array $items): void
    {
        $this->items = $items;
    }

    /**
     * @return Message[]
     */
    public function getMessagesTo(): array
    {
        return $this->messages_to;
    }

    /**
     * @param Message[] $messages_to
     */
    public function setMessagesTo(array $messages_to): void
    {
        $this->messages_to = $messages_to;
    }

    /**
     * @return Message[]
     */
    public function getMessagesFrom(): array
    {
        return $this->messages_from;
    }

    /**
     * @param Message[] $messages_from
     */
    public function setMessagesFrom(array $messages_from): void
    {
        $this->messages_from = $messages_from;
    }

}
