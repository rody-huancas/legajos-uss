import { useState } from 'react'
/* Libraries */
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
/* Utils */
import { actionIconVariants, itemVariants, wrapperVariants } from '@shared/utils/dropdown.util'
/* Icons */
import { IconType } from 'react-icons'

interface DropdownOption {
  icon    : IconType
  text    : string
  onClick?: () => void
  href   ?: string
}

interface DropdownProps {
  buttonText        : string
  options           : DropdownOption[]
  buttonClassName  ?: string
  dropdownClassName?: string
}

const Dropdown: React.FC<DropdownProps> = ({
  buttonText,
  options,
  buttonClassName   = 'flex items-center gap-2 p-3 rounded-full bg-secondary-800 text-secondary-100',
  dropdownClassName = 'flex flex-col gap-1 p-2 rounded-lg bg-white shadow-xl absolute top-[120%] left-0 w-44 overflow-hidden',
}) => {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <motion.div animate={open ? 'open' : 'closed'} className="relative">
      <button onClick={() => setOpen((pv) => !pv)} className={buttonClassName}>
        <span className="font-medium text-sm">{buttonText}</span>
      </button>
      <motion.ul
        initial={wrapperVariants.closed}
        variants={wrapperVariants}
        style={{ originY: 'top', translateX: '-70%' }}
        className={dropdownClassName}
      >
        {options.map((option, index) => (
          <Option key={index} {...option} setOpen={setOpen} />
        ))}
      </motion.ul>
    </motion.div>
  )
}

interface OptionProps extends DropdownOption {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const Option: React.FC<OptionProps> = ({ icon: Icon, text, onClick, href, setOpen }) => {
  const handleClick = () => {
    if (onClick) onClick()
    
    setOpen(false)
  }

  const content = (
    <>
      <motion.span variants={actionIconVariants}>
        <Icon />
      </motion.span>
      <span>{text}</span>
    </>
  )

  const className =
    'flex items-center gap-2 w-full p-2 text-sm whitespace-nowrap rounded-md hover:bg-indigo-100 text-slate-700 hover:text-indigo-500 transition-colors cursor-pointer'

  if (href) {
    return (
      <motion.li variants={itemVariants}>
        <Link to={href} className={className} onClick={() => setOpen(false)}>
          {content}
        </Link>
      </motion.li>
    )
  }

  return (
    <motion.li variants={itemVariants} onClick={handleClick} className={className}>
      {content}
    </motion.li>
  )
}

export default Dropdown